import Ajaxious from "ajaxious";
import {dispatch, getState} from "../../../Redux";
import {TaskInfo} from "../../../Redux/DataState/Tasks/Models/TaskInfo";
import {addTaskToSyncs} from "../../../../sync/utils";

let taskCounter = 999999;
let requestInterval;

export const tasksActions = {
    async startRequestingTasks() {
        requestInterval = setInterval(requestAllTasks, 40000);
        await requestAllTasks();
    },

    async deleteTask(id: number) {
        if (getState().tasks.tasks_flag['deleting_' + id])
            return;

        dispatch({type: 'flag_tasks', key: 'deleting_' + id});
        const res = await Ajaxious.delete('task/' + id);

        if (res.isSuccess || res.status <= 0)
            dispatch([
                {type: 'remove_tasks', key: id},
                {type: 'unflag_tasks', key: 'deleting_' + id}
            ]);
        else dispatch({type: 'unflag_tasks', key: 'deleting_' + id});

        if (res.status <= 0)
            await addTaskToSyncs('delete', {id});

    },

    async createTask(task: Partial<TaskInfo>, onSuccess?: () => void) {
        if (getState().tasks.tasks_flag['creating'])
            return;

        dispatch({type: 'flag_tasks', key: 'creating'});
        const res = await Ajaxious.post('task', task);

        if (res.isSuccess || res.status <= 0) {
            task = res.isSuccess ? res.data : {...task, id: ++taskCounter};
            dispatch([
                {type: 'add_tasks', data: task},
                {type: 'unflag_tasks', key: 'creating'}
            ]);

            onSuccess && onSuccess();
        } else dispatch({type: 'unflag_tasks', key: 'creating'});

        if (res.status <= 0)
            await addTaskToSyncs('create', task);

        return res;
    },

    async editTask(task: Partial<TaskInfo>, onSuccess?: () => void) {
        const id = task.id;
        if (getState().tasks.tasks_flag['editing_' + id])
            return;

        dispatch({type: 'flag_tasks', key: 'editing_' + id});
        const res = await Ajaxious.put('task/' + id, task);
        if (res.isSuccess || res.status <= 0) {
            dispatch([
                {type: 'replace_tasks', key: id, value: task},
                {type: 'unflag_tasks', key: 'editing_' + id}
            ]);
            onSuccess && onSuccess();
        } else dispatch({type: 'unflag_tasks', key: 'editing_' + id});

        if (res.status <= 0)
            await addTaskToSyncs('update', task);

        return res;
    }
};

const requestAllTasks = async () => {
    if (getState().tasks.tasks_flag['requesting_all'])
        return;

    dispatch({type: 'flag_tasks', key: 'requesting_all'});
    const res = await Ajaxious.get('/tasks');

    if (res.isSuccess) {
        dispatch([
            {type: 'set_tasks', data: res.data},
            {type: 'unflag_tasks', key: 'requesting_all'},
        ]);
    } else dispatch({type: 'unflag_tasks', key: 'requesting_all'});

    return res;
};