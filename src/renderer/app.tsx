import * as React from "react"
import * as ReactDOM from "react-dom"

import "./css/main.scss"

import { Provider, useSelector } from "react-redux"

import * as FileTree from "./FileTree"
import { PassListContainer } from "./PassList"
import * as Store from "./model/Store"

import { PassDetailView } from "./PassView/index"

const App = ({ store }) => {
    let projectDir = "./TestProject"
    const [fileTree, setFileTree] = React.useState(FileTree.directory(projectDir, []) as FileTree.Node)

    React.useEffect(() => {
        FileTree.buildTree(projectDir).then(tree => {
            setFileTree(tree)
        });
    }, [false])

    const isDetailView = useSelector((state: Store.ApplicationState) => state.activePass !== null)

    return (<>
        <div className="sidebar">
            <PassListContainer />
            {FileTree.view(fileTree)}
        </div>
        <div className="main-view">
            {isDetailView && <PassDetailView />}
        </div>
    </>)
}

const Bootstrap = ({ }) => {
    const store = Store.init()

    return <Provider store={store}>
        <App store={store} />
    </Provider>
}

export function main() {
    ReactDOM.render(
        <Bootstrap />,
        document.getElementById("app")
    );
}