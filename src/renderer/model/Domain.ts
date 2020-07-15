


export interface Fullscreen {
    type: "FULL_SCREEN"
}
export function createFullscreen(): Fullscreen {
    return {type: "FULL_SCREEN"}
}

export interface Mesh {
    type: "MESH"
    mesh: string
}
export function createMesh(mesh: string): Mesh {
    return {type: "MESH", mesh}
}


export type VertexInputType = Fullscreen | Mesh

export interface Pass {
    name: string
    vertexInputType: VertexInputType
    fragShaderFile: string | null
}

export function createPass(name: string): Pass {
    return { 
        name, 
        vertexInputType: {type: "FULL_SCREEN"},
        fragShaderFile: null
    }
}




