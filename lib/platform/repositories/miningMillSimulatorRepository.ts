import { MillingSimulationCommand, MillingSimulationResponse } from "@/lib/dtos/milling/milling-dto"
import { AxiosHttpClient } from "@/lib/shared/platform/repository/axios"

const axiosClient = new AxiosHttpClient()

export const miningMillSimulatorRepository = {
    async simulate(data: MillingSimulationCommand): Promise<MillingSimulationResponse> {
        const response = await axiosClient.post('/selected-object', data)

        const bodyResponse = JSON.parse(response);

        return bodyResponse
    }
}