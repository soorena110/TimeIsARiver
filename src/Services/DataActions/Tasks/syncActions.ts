import {tasks_create, tasks_delete, tasks_update, ticks_update} from "../../SourceManament/Sync/DexieDB";
import Ajaxious from "ajaxious";
import {TaskInfo} from "../../../Redux/DataState/Tasks/Models/TaskInfo";
import {TickInfo} from "../../../Redux/DataState/Tasks/Models/TickInfo";


export const syncActions = {
    async syncTaskAndTicksChangesToServer() {
        try {
            await syncCreatingTasks();
            await syncUpdatingTasks();
            await syncDeletingTasks();
            await syncUpdatingTicks();
        } catch (e) {
            console.error(e);
        }
    }
};

const syncDeletingTasks = async () => {

    const deletingTasks: TaskInfo[] = await tasks_delete.toArray();
    for (let task of deletingTasks) {
        const res = await Ajaxious.delete('task/' + task.id, task);
        if (res.status <= 0) {
            await tasks_delete.delete(task.id);
            await ticks_update.delete(task.id);
        }
    }
};

const syncUpdatingTasks = async () => {
    const updatingTasks: TaskInfo[] = await tasks_update.toArray();
    for (let task of updatingTasks) {
        const res = await Ajaxious.put('task/' + task.id, task);
        if (res.status > 0)
            await tasks_update.delete(task.id);
    }
};

const syncCreatingTasks = async () => {
    const creatingTasks: TaskInfo[] = await tasks_create.toArray();
    for (let task of creatingTasks) {
        const prevTaskId = task.id;
        delete task.id;

        const res = await Ajaxious.post('task', task);
        if (res.status > 0) {
            const newTask: TaskInfo = res.data;

            const tick: TickInfo = await ticks_update.get(prevTaskId);
            if (tick) {
                tick.taskId = newTask.id;
                await ticks_update.update(prevTaskId, tick);
            }
            await tasks_create.delete(task.name);
        }
    }
};

const syncUpdatingTicks = async () => {
    const updatingTicks: any[] = await ticks_update.toArray();
    for (let task of updatingTicks) {
        const res = await Ajaxious.put('/ticks', task);
        if (res.status > 0)
            await ticks_update.delete(task.taskId);
    }
};