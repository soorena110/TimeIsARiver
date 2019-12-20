import {TaskInfo} from "../src/Redux/DataState/Tasks/Models/TaskInfo";
import Persian from "persian-info";
import {convertTaskHourToNumber, getDateFromDateTime} from "./dateTimeUtils";
import {TaskView} from "./tasksUtils";
import {getTickUniqueId, TickInfo} from "../src/Redux/DataState/Tasks/Models/TickInfo";

export function computeTaskOfDateForMonth(tasks: TaskInfo[], ticks: TickInfo[], startDate: Date, endDate: Date) {
    const startDateInJalali = Persian.date.convertDateTimeToJalali(startDate);
    const theDaysCountInTheMonth = Persian.date.getJalaliMonthDaysCount(startDateInJalali.year, startDateInJalali.month);
    tasks = tasks.filter(t => Math.min(theDaysCountInTheMonth, t.monthDay || 1) == startDateInJalali.day);

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