import { AxiosHttpClient } from "@/lib/platform/repository/axios"

const url = 'localhost:8000'

export const miningMillSimulatorRepository = {
    get() {
        const axiosClient = new AxiosHttpClient({
            url
        })

        return axiosClient.get()
    }
}