import axios from 'axios'


const API = axios.create({
    baseURL: process.env.baseURL,
    withCredentials: true
})

export default API