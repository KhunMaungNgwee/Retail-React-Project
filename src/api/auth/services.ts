import type { LoginPayload } from './types'
import axios from 'axios'

const baseUrl = '/Login'

const login = async (credentials: LoginPayload) => {
    const request = await axios.post(`${baseUrl}/UserLogin`, credentials)
    return request.data
}

export default { login }
