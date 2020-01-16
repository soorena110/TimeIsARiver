import {TaskInfo} from "../src/Redux/DataState/Tasks/Models/TaskInfo";
import {tasks_create, tasks_delete, tasks_update, ticks_update} from "./DexieDB";
import {getTickUniqueId} from "../src/Redux/DataState/Tasks/Models/TickInfo";

export const addSyncTag = async (tag: string) => {
    if (!('serviceWorker' in navigator && 'syncManager' in window))
        return;
    const sw = await navigator.serviceWorker.ready;
    try {
        await sw.sync.register(tag)
    } catch (e) {
        console.error(e)
    }
};

export const addTaskToSyncs = async (action: 'create' | 'delete' | 'update', task: Partial<TaskInfo>) => {
    let prevCreateTask = (await tasks_create.toArray()).find(t => t.id == task.id);
    let prevUpdateTask = await tasks_update.get(task.id);
    let prevTickOfTask = ticks_update.where('taskId').equals(task.id as any);

    switch (action) {
        case "create":
            await tasks_create.put(task);
            break;

        case "update":
            if (prevCreateTask) {
                await tasks_create.delete(prevCreateTask.name);
                await tasks_create.put(task);
            } else await tasks_update.put(task);
            break;

        case "delete":
            if (prevCreateTask)
                await tasks_create.delete(prevCreateTask.name);
            else await tasks_delete.add(task);

            if (prevUpdateTask)
                await tasks_update.delete(task.id);
            if (await prevTickOfTask.count())
                await prevTickOfTask.delete();
            break;
    }
    await addSyncTag('taskChange');
};


export const addTickToSyncs = async (action: 'update', tick: any) => {
    tick._unique = getTickUniqueId(tick);
    await ticks_update.put(tick);
    await addSyncTag('taskChange');
};