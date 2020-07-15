import { Pass, createPass, VertexInputType } from "./Domain";
import * as Project from "./Project";
import { createStore } from "redux";


interface CreatePassAction {
    type: "CREATE_PASS"
    name: string
}

export function createNewPassAction(name): CreatePassAction {
    return {
        type: "CREATE_PASS",
        name
    }
}


interface SetCurrentPassAction {
    type: "SET_ACTIVE_PASS"
    name: string
}

export function createSetCurrentPassAction(name): SetCurrentPassAction {
    return {
        type: "SET_ACTIVE_PASS",
        name
    }
}

interface SetVertexInputTypeAction {
    type: "SET_VERTEX_INPUT_TYPE",
    pass: string,
    input: VertexInputType,
}

export function createSetVertexInputTypeAction(passName: string, input: VertexInputType): SetVertexInputTypeAction {
    return {
        type: "SET_VERTEX_INPUT_TYPE",
        pass: passName,
        input
    }
}

type Action =
    CreatePassAction
    | SetCurrentPassAction
    | SetVertexInputTypeAction


export interface ApplicationState {
    loadedProject: Project.Project
    activePass: string | null
}




const initialState: ApplicationState = {
    loadedProject: Project.initialState,
    activePass: null
}


function reducer(state: ApplicationState | undefined, action: Action): ApplicationState {
    if (typeof state === "undefined") {
        return initialState
    }

    switch (action.type) {
        case "CREATE_PASS":
            return Object.assign({}, state, {
                loadedProject: Project.createNewPass(state.loadedProject, action.name),
                activePass: action.name
            })
        case "SET_ACTIVE_PASS":
            return Object.assign({}, state, {
                activePass: action.name
            })
        case "SET_VERTEX_INPUT_TYPE":
            const pass = Object.assign({}, Project.findPass(state.loadedProject, action.pass))
            pass.vertexInputType = action.input
            return Object.assign({}, state, { loadedProject: Project.replacePass(state.loadedProject, action.pass, pass)})
    }

    // never forget, in case of init message
    return state
}


import { useSelector, useDispatch } from "react-redux"

/// hooks
export function useCurrentPass() {
    return useSelector((state: ApplicationState) => Project.findPass(state.loadedProject, state.activePass!)!)
}

export function useStoreDispatch() {
    const dispatch = useDispatch()
    return (action: Action) => dispatch(action)
}



// init stuff


const loadState = () => {
    try {
        const serializedState = localStorage.getItem("state")
        if (serializedState === null) {
            return undefined
        }
        return JSON.parse(serializedState)
    } catch (e) {
        return undefined
    }
}

const saveState = state => {
    try {
        const serializedState = JSON.stringify(state)
        localStorage.setItem("state", serializedState)
    } catch (err) {
        // ignore write errors
        console.log(err)
    }
}

export const init = () => {
    const persistedState: ApplicationState = loadState()

    const store = createStore(
        reducer,
        persistedState,
        (window as any).__REDUX_DEVTOOLS_EXTENSION__ && (window as any).__REDUX_DEVTOOLS_EXTENSION__()
    )

    store.subscribe(() => {
        saveState(store.getState())
    })

    return store
}