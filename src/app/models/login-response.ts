import { HTTP_STATE } from "../constants"

export interface ILoginResponse {
    data: ILoginResponseData,
    state: HTTP_STATE,
    message: string
}

export interface ILoginResponseData {
    userId: string,
    firstName: string,
    lastName: string,
    token: string,
    refreshToken: string
}

