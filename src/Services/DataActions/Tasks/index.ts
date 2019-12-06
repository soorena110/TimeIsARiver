import {tasksActions} from "./tasksActions";
import {ticksActions} from "./ticksActions";

export const tasksService = {
    ...tasksActions,
    ...ticksActions
};