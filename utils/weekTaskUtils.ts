import {TaskInfo} from "../src/Redux/DataState/Tasks/Models/TaskInfo";
import {convertTaskHourToNumber, getDateFromDateTime} from "./dateTimeUtils";
import {TaskView} from "./tasksUtils";
import {getTickUniqueId, TickInfo} from "../src/Redux/DataState/Tasks/Models/TickInfo";

export function computeTaskOfDateForWeek(tasks: TaskInfo[], ticks: TickInfo[], startDate: Date, endDate: Date) {
    const weekDay = (startDate.getDay() + 1) % 7;
    tasks = tasks.filter(t => convertNumberToWeekDays(t.weekdays).includes(weekDay));

    return tasks.map(task => {
        const ret: TaskView = {
            date: getDateFromDateTime(startDate),
            startHour: task.startHour,
            endHour: task.endHour,
            estimate: task.estimate,
            toleranceMinutes: computeToleranceMinutes(task),

            task: task,
            tick: getTaskTick(task.id, ticks, startDate)
        };
        return ret;
    });
}

const getTaskTick = (taskId: number, ticks: TickInfo[], startDate: Date) => {
    const forDate = startDate.toISOString().split('T')[0];
    return ticks.find(t => t._unique == getTickUniqueId({taskId, forDate}))
};

const computeToleranceMinutes = (task: TaskInfo) => {
    const [h, m] = (task.endHour || '24:00').split(':').map(r => parseInt(r));
    const taskEndDate = new Date();
    taskEndDate.setHours(h);
    taskEndDate.setMinutes(m);

    const hourLeftToBeDone = convertTaskHourToNumber(task.estimate) || 0;
    const toleranceSeconds = (new Date(taskEndDate).valueOf() - new Date().valueOf()) / 1000 - hourLeftToBeDone;
    return Math.floor(toleranceSeconds / 60);
};

export function convertNumberToWeekDays(weekDaysNumber?: number): number[] {
    if (!weekDaysNumber)
        return [];

    return (weekDaysNumber >>> 0).toString(2)
        .split('')
        .reverse()
        .map((r, ix) => r == '1' ? ix : -1)
        .filter(n => n != -1);
}