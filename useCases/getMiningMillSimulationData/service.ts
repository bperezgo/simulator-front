import { miningMillSimulatorRepository } from "@/platform/repositories/miningMillSimulatorRepository"

export const service = {
    getMiningMillSimulationData() {
        return miningMillSimulatorRepository.get()
    }
}