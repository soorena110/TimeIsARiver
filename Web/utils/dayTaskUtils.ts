import {TaskInfo} from "../src/Redux/DataState/Tasks/Models/TaskInfo";
import {convertTaskHourToNumber, getDateFromDateTime, getHourFromDateTime} from "./dateTimeUtils";
import {TaskView} from "./tasksUtils";
import {TickInfo} from "../src/Redux/DataState/Tasks/Models/TickInfo";

export function computeTaskOfDateForDay(tasks: TaskInfo[], ticks: TickInfo[], startDate: Date, endDate: Date) {
    tasks = tasks.filter(t => !t.start || new Date(t.start) < endDate);

    return tasks.map(task => {
        const ret: TaskView = {
            date: getDateFromDateTime(startDate),
            startHour: task.start && new Date(task.start) > startDate ? getHourFromDateTime(task.start) : undefined,
            endHour: computeEndHour(task, startDate, endDate),
            estimate: task.estimate,
            toleranceMinutes: computeToleranceMinutes(task),


            task: task,
            tick: getTaskTick(task.id, ticks)
        };
        return ret;
    });
}

const getTaskTick = (taskId: number, ticks: TickInfo[]) => {
    return ticks.find(t => t.taskId == taskId)
};


const computeEndHour = (task: TaskInfo, startDate: Date, endDate: Date) => {
    if (!task.end) return;
    if(new Date(task.end) > endDate) return;

    if (new Date(task.end) > startDate && new Date(task.end) < endDate)
        return getHourFromDateTime(task.end);
    return '00:58'
};

const computeToleranceMinutes = (task: TaskInfo) => {
    if (!task.end)
        return 9999999;
    const hourLeftToBeDone = convertTaskHourToNumber(task.estimate) || 0;
    const toleranceSeconds = (new Date(task.end).valueOf() - new Date().valueOf()) / 1000 - hourLeftToBeDone;
    return Math.floor(toleranceSeconds / 60);
};