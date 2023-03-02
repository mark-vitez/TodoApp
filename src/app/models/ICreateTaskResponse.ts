import { ITodoTask} from './index';
import { HTTP_STATE } from '../constants';


export interface ICreateTaskResponse{
    data: ITodoTask,
    state: HTTP_STATE,
    message: string
}