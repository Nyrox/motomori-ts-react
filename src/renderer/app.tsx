import * as ReactDOM from "react-dom"
import * as React from "react"

import "./css/main.scss"

import { createStore } from "redux"

import * as FileTree from "./FileTree"


enum Action {
    Increment,
    Decrement
}

function counter(state = 0, action: { type: Action }) {
    switch(action.type) {
        case Action.Increment: return state + 1
        case Action.Decrement: return state - 1
    }
}

let store = createStore(counter)

store.subscribe(() => console.log(store.getState()))

store.dispatch({ type: Action.Increment })
store.dispatch({ type: Action.Decrement })


function App() {
    const [fileTree, setFileTree] = React.useState(FileTree.directory("./TestProject", []) as FileTree.Node)

    FileTree.buildTree("./TestProject").then(tree => {
        setFileTree(tree)
    });

    return <div className="app">
        {FileTree.view(fileTree)}
    </div>
}

export function main() {
    ReactDOM.render(
        <App></App>,
        document.getElementById("app")
    );
}