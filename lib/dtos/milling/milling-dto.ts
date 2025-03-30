export type InputDataFile = Record<string, number>
export type OutputDataFile = Record<string, number>

export interface MillingSimulationCommand {
    alpha: number
    betha: number
    gamma: number
    time: number
    inputDataFile: InputDataFile
    outputDataFile: OutputDataFile
}