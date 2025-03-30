import { MillingSimulationCommand } from "@/lib/dtos/milling/milling-dto"
import { AxiosHttpClient } from "@/lib/shared/platform/repository/axios"

const url = 'localhost:8000'

export const miningMillSimulatorRepository = {
    get() {
        const axiosClient = new AxiosHttpClient({
            url
        })

        return axiosClient.get()
    },
    async simulate(data: MillingSimulationCommand): Promise<void> {
        const axiosClient = new AxiosHttpClient({
            url
        })

        await axiosClient.post(data)
    }
}