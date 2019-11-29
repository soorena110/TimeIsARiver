import {TaskInfo} from "./TaskInfo";
import {TickInfo} from "./TickInfo";

export default interface TasksState {
    tasks?: { [id: string]: TaskInfo };
    ticks?: { [id: string]: TickInfo };
    tasks_flag: { [key: string]: boolean };
    ticks_flag: { [key: string]: boolean };
}

