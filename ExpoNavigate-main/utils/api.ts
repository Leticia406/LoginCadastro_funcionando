
import axios from 'axios'

export const apiConfig = axios.create({
    baseURL : 'http://192.168.56.1:3000'
})