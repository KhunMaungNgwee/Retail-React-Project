import type { AddUserModel, LoginPayload } from './types'
import axios from 'axios'

const baseUrl = '/Login'

const login = async (credentials: LoginPayload) => {
    const request = await axios.post(`${baseUrl}/UserLogin`, credentials)
    return request.data
}
const addNewUser= async (payload:AddUserModel)=>{
    const response = await axios.post(`${baseUrl}/AddNewUser`,payload)
    return response.data
}
export default { login,addNewUser }
