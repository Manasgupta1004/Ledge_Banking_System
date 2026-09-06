import axios from 'axios'

const API = axios.create({
    baseURL: import.meta.env.Backend_URL
})

export default API