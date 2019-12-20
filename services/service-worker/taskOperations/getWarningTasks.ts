import {tasks_create, tasks_delete, tasks_update, tasksDB, ticks_update, ticksDB} from "../../../sync/DexieDB";
import {TaskInfo} from "../../../src/Redux/DataState/Tasks/Models/TaskInfo";
import {getTickUniqueId, TickInfo, TickType} from "../../../src/Redux/DataState/Tasks/Models/TickInfo";
import computeTaskOfDate from "../../../utils/tasksUtils";
import {getDateFromDateTime} from "../../../utils/dateTimeUtils";


export default async () => {
    const tasks = await getTasks();
    const ticks = await getTicks();

    const currentDayStart = getDateFromDateTime(new Date());
    const taskViews = computeTaskOfDate(tasks, ticks, currentDayStart, new Date(currentDayStart.valueOf() + 24 * 3600 * 1000));

    return taskViews.filter(tv => {
        if (tv.tick && tv.tick.type != TickType.todo)
            return false;
        return tv.toleranceMinutes <= 15;
    });
};

const getTasks = async () => {
    const deletedTasksSet = new Set((await tasks_delete.toArray()).map((t: TaskInfo) => t.id));
    const updatedTasksMap = new Map((await tasks_update.toArray()).map((t: TaskInfo) => [t.id, t]));
    const createdTasks: TaskInfo[] = await tasks_create.toArray();

    let tasks: TaskInfo[] = await tasksDB.toArray();
    tasks = tasks.filter(task => !deletedTasksSet.has(task.id));
    tasks = tasks.map(task => updatedTasksMap.get(task.id) || task);
    return [...tasks, ...createdTasks];
};


const getTicks = async () => {
    const ticksMap = new Map(
        (await ticks_update.toArray())
            .map((t: TickInfo) => [getTickUniqueId(t), t])
    );

    const ticks: TickInfo[] = await ticksDB.toArray();
    ticks.forEach(tick => {
        const key = getTickUniqueId(tick);
        if (!ticksMap.has(key))
            ticksMap.set(key, tick)
    });

    return Array.from(ticksMap.values());
};