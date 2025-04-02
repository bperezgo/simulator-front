import { config } from '@/lib/platform/config';
import axios, { AxiosInstance } from 'axios';

export interface AxiosConfig {
    url: string
}

export class AxiosHttpClient {
    private client: AxiosInstance

    constructor() {
        const baseURL = config.publicApiUrl
        this.client = axios.create({
            baseURL,
            headers: {
                'Content-Type': 'application/json'
            }
        })
    }

    async get<T>(url: string): Promise<T> {
        const { data } = await this.client.get<T>(url)

        return data
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async post<S, T = any>(url: string, data: S): Promise<T> {
        const { data: responseData } = await this.client.post<T>(url, data)

        return responseData
    }
}