import * as Domain from "./Domain";




export interface Project {
    passes: Domain.Pass[]
}


export const initialState: Project = {
    passes: []
}

export function createNewPass(project: Project, name) {
    return {
        passes: project.passes.concat([Domain.createPass(name)])
    }
}

export function findPass(project: Project, name: string): Domain.Pass | undefined {
    return project.passes.find(p => p.name == name)
}

export function replacePass(project: Project, pass: string, replace: Domain.Pass): Project {
    return {...project, passes: project.passes.map(v => {
        if (v.name == pass) { return replace }
        else { return v }
    })}
}