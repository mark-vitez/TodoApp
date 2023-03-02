import { HttpStatusCode, HTTP_STATE } from "../constants";
import { ITodoTask } from "./ITodoTask";

export interface ITodoList{
    id: number;
    name: string;
    creationDate: Date
    tasks: ITodoTask[]
}

export interface ITodoListsResponse{
    data: ITodoList[],
    state: HTTP_STATE,
    message: string;
}

export interface ITodoListResponse{
    data: ITodoList,
    state: HTTP_STATE,
    message: string;
}


