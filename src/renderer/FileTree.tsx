import { fs } from "./NodeBindings"
import * as nodePath from "path"
import * as nodeFs from "fs"

export enum ItemType {
    File,
    Directory,
    Other
}

export interface File {
    kind: ItemType.File
    path: string
}
export const file = (path: string): File => ({kind: ItemType.File, path})


export interface Directory {
    kind: ItemType.Directory
    path: string
    items: Node[]
}
export const directory = (path: string, items: Node[]): Directory => ({kind: ItemType.Directory, path, items})

export type Node = Directory | File



function itemtype(stat: nodeFs.Stats) {
    if (stat.isFile()) return ItemType.File
    if (stat.isDirectory()) return ItemType.Directory

    return ItemType.Other
}

export async function buildTree(path: string): Promise<Node> {
    let f = await fs.readdir(path)
    let fileStats = await Promise.all(f.map(async file => {
        let p = nodePath.resolve(path, file)
        let stat = await fs.stat(p)
        let type = itemtype(stat)
        return { path: p, type }
    }))

    let childNodes: (Node | null)[] = await Promise.all(fileStats.map(async ({ path, type }) => {
        switch (type) {
            case ItemType.Other: return null
            case ItemType.File: return file(path)
            case ItemType.Directory:
                return buildTree(path)
        }
    }))

    return directory(path, childNodes.filter(v => v !== null).map(v => v!))
}


/// view
import * as React from "react"


function DirEntry({ dir, depth }) {
    let basename = nodePath.basename(dir.path)

    let [hidden, setHidden] = React.useState(depth !== 0)
    let srcString = hidden ? "icons/directory.svg" : "icons/directory_open.svg"
    let icon = <img src={srcString} />

    return (
        <li className={"directory " + (hidden ? "hidden" : "")}
            onClick={() => setHidden(!hidden)}>
            { icon }
            { basename }
        </li>)
}

function treeNode(node: Node, depth) {
    let basename = nodePath.basename(node.path)
    switch (node.kind) {
        case ItemType.File:
            return [
                <li key={basename}>{ basename }</li>
            ]
        case ItemType.Directory:
            return <React.Fragment key={basename}>
                <DirEntry dir={node} depth={depth} />
                <ul className="file-list">
                    { node.items.map(v => treeNode(v, depth + 1)) }
                </ul>
            </React.Fragment>
    }
}

export function view(node: Node) {
    return <ul className="file-tree">
        { treeNode(node, 0) }
    </ul>
}