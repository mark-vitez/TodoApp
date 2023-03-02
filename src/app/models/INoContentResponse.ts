import { HTTP_STATE } from "../constants";

export interface INoContentResponse{
    state: HTTP_STATE,
    message: string
}