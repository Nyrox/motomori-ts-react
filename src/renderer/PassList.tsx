
import React from "react"
import { Pass, Project } from "./app"

import { connect } from "react-redux"



const Pass = ({pass}: {pass: Pass}) => {

    return <li className="pass-list">pass.name</li>
}




const PassList = ({ passes }: { passes: Pass[] }) => {

    return <div className="pass-list">
        { passes.map(p => <Pass pass={p} />) }
    </div>
}

const mapStateToProps = (state: Project) => {
    return {
        passes: state.passes
    }
}

const mapDispatchToProps = dispatch => {
    return {}
}


export const PassListContainer = connect(mapStateToProps, mapDispatchToProps)(PassList)