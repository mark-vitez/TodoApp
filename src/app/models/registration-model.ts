import { HTTP_STATE } from "../constants"

export interface IRegistrationModel{
    email: string,
    password: string
}



export interface IRegistrationResponse {
    state: HTTP_STATE,
    message: string
}
