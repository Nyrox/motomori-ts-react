
import React from "react"
import { useSelector, useDispatch } from "react-redux"

import * as Store from "../model/Store"
import * as Project from "../model/Project"
import * as Domain from "../model/Domain"

interface CustomSelectProps<T> {
    value: string;
    options: [string, T][];
    onSelect: (val: T) => any
}

export function CustomSelect<T>({ value, options, onSelect }: CustomSelectProps<T>) {
    const [expanded, setExpanded] = React.useState(false)

    const createOption = ([label, value]) => (
        <li key={label} onClick={e => {
            e.stopPropagation()
            setExpanded(false)
            onSelect(value)
        }}>{label}</li>
    )

    return <div className={"custom-select " + (expanded ? "active" : "")} onClick={() => setExpanded(true)}>
        {value}
        <img src="icons/select_expand_arrow.svg" />
        <ul className="options">
            {options.map(createOption)}
        </ul>
    </div>
}


const VertexInputBlock = () => {
    console.log("test")

    const createLabel = (type: "FULL_SCREEN" | "MESH") => {
        switch (type) {
            case "FULL_SCREEN": return "Fullscreen"
            case "MESH": return "Mesh"
        }
    };

    const currentPass = Store.useCurrentPass()
    const dispatch = useDispatch()    

    const setVertexInput = React.useCallback(
        v => dispatch(Store.createSetVertexInputTypeAction(currentPass.name, v)),
        [dispatch, currentPass]
    )

    const label = createLabel(currentPass.vertexInputType.type)
    const options: [string, Domain.VertexInputType][] = [
        [createLabel("FULL_SCREEN"), Domain.createFullscreen()],
        [createLabel("MESH"), Domain.createMesh("")]
    ]
    return <fieldset>
        <label>Vertex Input Type</label>
        <CustomSelect value={label} options={options} onSelect={setVertexInput} />
    </fieldset>
}

const VertexDataBlock = () => {
    return <div className="block">
        <h2>Vertex Data</h2>
        <VertexInputBlock />
    </div>
}

const UniformDataBlock = () => {
    return <></>
}

const SamplerDataBlock = () => {
    return <></>
}


export const InputPanel = () => {

    return <div className="panel">
        <VertexDataBlock />
        <UniformDataBlock />
        <SamplerDataBlock />
    </div>
}