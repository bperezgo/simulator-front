import { MillingSimulationCommand, MillingSimulationResponse } from "@/lib/dtos/milling/milling-dto"
import { miningMillSimulatorRepository } from "@/lib/platform/repositories/miningMillSimulatorRepository"

export const getMiningMillSimulationService = {
    async sendData(data: MillingSimulationCommand): Promise<MillingSimulationResponse> {
        const response = await miningMillSimulatorRepository.simulate(data)
        return response
    },
}