import { MillingSimulationCommand } from "@/lib/dtos/milling/milling-dto"
import { miningMillSimulatorRepository } from "@/platform/repositories/miningMillSimulatorRepository"

export const service = {
    getMiningMillSimulationData() {
        return miningMillSimulatorRepository.get()
    },

    async dispatchMillingData(data: MillingSimulationCommand): Promise<void> {
        await miningMillSimulatorRepository.simulate(data)
    }
}