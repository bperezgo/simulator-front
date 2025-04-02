export type InputDataFile = {
    class_: string
    fraction: number
}
export type OutputDataFile = {
    class_: string
    fraction: number
}

export interface MillingSimulationCommand {
    material: {
        alpha: number
        betha: number
        gamma: number
    }
    minutes: number
    input: InputDataFile[]
    output: OutputDataFile[]
}

export interface MillingSimulationResponse {
    parameters: {
        label: string
        value: number
    }[]
    results: {
        label: string
        data: {
            time: number
            massFraction: number
        }[]
    }[]
}