
import React, { useState } from "react"

import { connect } from "react-redux"

import { ApplicationState, createNewPassAction, createSetCurrentPassAction } from "./model/Store"
import { Pass as PassItem } from "./model/Domain"






const PassListHeader = ({ createPass }) => {
    return <div className="header">
        <h2>Passes</h2>
        <span className="button" onClick={createPass}
        >+</span>
    </div>
}


const CreatePassDialog = ({ abort, submit }) => {
    const [value, setValue] = useState("")

    return (
        <form key="create-dialog" onSubmit={e => { e.preventDefault(); submit(value) }}>
            <input
                type="text"
                className="pass-item create-dialog"
                onBlur={abort}
                onInput={e => setValue((e.target as any).value)}
                onChange={_ => undefined} // disable a react warning
                value={value}
                autoFocus
            />
        </form>
    )
}


interface PassProps {
    pass: PassItem
    onClick: Function
    active: boolean
}
const PassItem = ({ pass, onClick, active }: PassProps) => {
    return <li onClick={() => onClick()} className={"pass-item " + (active ? "active": "")}>{pass.name}</li>
}


interface PassListProps {
    passes: PassItem[]
    activePass: string | null
    createPass: Function
    setActivePass: Function
}

const PassList = ({ passes, activePass, createPass, setActivePass }: PassListProps) => {
    const [experiencingInput, setExperiencingInput] = useState(false)

    let submit = name => {
        setExperiencingInput(false)
        createPass(name)
    }

    return <div className={"pass-list" + (experiencingInput ? " is-experiencing-input" : "")}>
        <PassListHeader createPass={() => setExperiencingInput(true)} />
        <div className={"pass-items"}>
            {passes.map(p => <PassItem key={p.name} active={p.name === activePass} pass={p} onClick={() => setActivePass(p.name) } />)}
            {experiencingInput && <CreatePassDialog abort={() => setExperiencingInput(false)} submit={submit} />}
        </div>
    </div>
}

const mapStateToProps = (state: ApplicationState) => {
    return {
        passes: state.loadedProject.passes,
        activePass: state.activePass
    }
}

const mapDispatchToProps = dispatch => {
    return {
        createPass: name => dispatch(createNewPassAction(name)),
        setActivePass: name => dispatch(createSetCurrentPassAction(name))
    }
}


export const PassListContainer = connect(mapStateToProps, mapDispatchToProps)(PassList)