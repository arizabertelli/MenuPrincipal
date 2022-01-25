import axios from 'axios'

export const http = axios.create({
    baseURL: 'https://github.com/BrasilAPI/cep-promise.git'
})