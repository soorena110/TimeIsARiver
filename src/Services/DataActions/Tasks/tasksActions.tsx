import Ajaxious, {AjaxStatus} from "ajaxious";
import {dispatch, getState} from "../../../Redux";
import {TaskInfo} from "../../../Redux/DataState/Tasks/Models/TaskInfo";

export const tasksActions = {
    requestAllTasks: () => {
        if (getState().tasks.tasks || getState().tasks.tasks_flag['all'])
            return;

        dispatch({type: 'Flag_tasks', key: 'all'});
        return Ajaxious.get('/tasks').then((res: any) => {
            const unflagAction = {type: 'Unflag_tasks', key: 'all'};
            if (res.status == AjaxStatus.ok) {
                dispatch([
                    {type: 'Set_tasks', data: res.data},
                    unflagAction
                ]);
            } else dispatch(unflagAction);

            return res;
        });
    },
    deleteTask(id: number) {
        if (getState().tasks.tasks_flag['deleting_' + id])
            return;

        dispatch({type: 'Flag_tasks', key: 'deleting_' + id});
        Ajaxious.delete('taskView/' + id).then((res: any) => {
            if (res.status == 200) {
                dispatch([
                    {type: 'remove_tasks', key: id},
                    {type: 'Unflag_tasks', key: 'deleting_' + id}
                ]);
            } else dispatch({type: 'Unflag_tasks', key: 'deleting_' + id});
        });
    },
    createTask(task: any, onSuccess?: () => void) {
        if (getState().tasks.tasks_flag['creating'])
            return;

        dispatch({type: 'Flag_tasks', key: 'creating'});
        return Ajaxious.post('task', task).then((res: any) => {
            if (res.status == 200) {
                onSuccess && onSuccess();
                dispatch([
                    {type: 'add_tasks', data: res.data},
                    {type: 'Unflag_tasks', key: 'creating'}
                ]);
            } else dispatch({type: 'Unflag_tasks', key: 'creating'});
        });
    },
    editTask(task: any, onSuccess?: () => void) {
        const id = task._id;
        if (getState().tasks.tasks_flag['editing_' + id])
            return;

        dispatch({type: 'Flag_tasks', key: 'editing_' + id});
        return Ajaxious.put('taskView/' + id, task).then((res: any) => {
            if (res.status == 200) {
                onSuccess && onSuccess();
                dispatch([
                    {type: 'replace_tasks', key: id, value: task},
                    {type: 'Unflag_tasks', key: 'editing_' + id}
                ]);
            } else dispatch({type: 'Unflag_tasks', key: 'editing_' + id})
        });
    }
};