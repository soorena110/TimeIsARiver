import {tasksActions} from "./tasksActions";
import {ticksActions} from "./ticksActions";
import {syncActions} from "./syncActions";

export const tasksService = {
    ...tasksActions,
    ...ticksActions,
    ...syncActions
};