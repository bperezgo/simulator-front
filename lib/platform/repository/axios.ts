import axios from 'axios';

export interface AxiosConfig {
    url: string
}

export class AxiosHttpClient {
    private url: string

    constructor(config: AxiosConfig) {
        this.url = config.url
    }

    async get<T>(): Promise<T> {
        const { data } = await axios.get<T>(this.url)

        return data
    }

    post<T>(data: T) {
        return axios.post(this.url, data)
    }
}