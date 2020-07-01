import * as React from "react"
import * as ReactDOM from "react-dom"

import "./css/main.scss"

import { createStore } from "redux"
import { Provider } from "react-redux"

import * as FileTree from "./FileTree"
import { PassListContainer } from "./PassList"


export interface Pass {
    name: string
}

export interface Project {
    passes: Pass[]
}


interface CreatePassAction {
    kind: "CREATE_PASS"
    pass: Pass
}

type ProjectAction = CreatePassAction


function project(state: Project = {passes: []}, action: ProjectAction): Project {
    switch (action.kind) {
        case "CREATE_PASS":
            return {passes: state.passes.concat([action.pass]) }
    }
}





const App = () => {
    let projectDir = "./TestProject"
    const [fileTree, setFileTree] = React.useState(FileTree.directory(projectDir, []) as FileTree.Node)

    FileTree.buildTree(projectDir).then(tree => {
        setFileTree(tree)
    });

    return (<>        
            {/* <PassListContainer /> */}
            <div className="app">
                {FileTree.view(fileTree)}
            </div>
    </>)
}

const Bootstrap = ({}) => {
    const store = createStore(project)

    return <Provider store={store}>
        <App />
    </Provider>
}

export function main() {
    ReactDOM.render(
        <Bootstrap />,
        document.getElementById("app")
    );
}