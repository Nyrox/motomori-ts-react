import React from "react"

import { ApplicationState, useCurrentPass, useStoreDispatch } from "../model/Store"


interface CustomSearchBoxProps<T> {
    currentValue: string | null
    provideOptions(v: string): [string, T][]
    onSelectValue(v: T): any
}

export function CustomSearchBox<T> ({ currentValue, provideOptions, onSelectValue }: CustomSearchBoxProps<T>) {
    const [value, setValue] = React.useState(currentValue || "")
    const [active, setActive] = React.useState(false)

    const _onSelectValue = (v) => {
        setActive(false)
        onSelectValue(v)
    }

    const createOption = ([label, value]: [string, T]) => {
        return <li key={label} onClick={() => _onSelectValue(value)}>
            { label }
        </li>
    }

    return <div className={"custom-searchbox " + (active ? "expand": "")}>
        <input 
            type="text"
            className="pass-item create-dialog"
            onFocus={() => setActive(true)}
            value={value}
            onInput={e => setValue((e.target as any).value)}
            onChange={_ => undefined} // disable a react warning
            onBlur={() => { setValue(currentValue || ""); setActive(false)}}
        />
        <div className="options-list">
            { provideOptions(value).map(createOption) }
        </div>
    </div>
}

const FragmentShaderBlock = () => {
    const currentPass = useCurrentPass()
    const dispatch = useStoreDispatch()


    const findFiles = v => {
        return [
            ["doing your mom", "mom"]
        ]
    }

    return <div className="block">
        <h2>Fragment Shader</h2>
        <fieldset>
            <label>Fragment Shader File</label>
            <CustomSearchBox
                currentValue={currentPass.fragShaderFile}
                onSelectValue={console.log}
                provideOptions={findFiles}
            />
        </fieldset>
    </div>
}


export const FragmentShaderPanel = () => {
    const currentPass = useCurrentPass()
    const dispatch = useStoreDispatch()

    return <div className="panel">
        <FragmentShaderBlock />
    </div>
}