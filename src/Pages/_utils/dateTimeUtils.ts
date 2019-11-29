import {TaskInfo, TaskType} from "../../Redux/DataState/Tasks/Models/TaskInfo";
import {convertNumberToWeekDays} from "./index";
import Persian from "persian-info";

export default function computeTaskOfDate(tasks: TaskInfo[], startDate: Date, endDate: Date): TaskView[] {
    tasks = filterCommons(tasks, startDate, endDate);

    return [
        ...computeTaskOfDateForDay(tasks.filter(r => r.type == TaskType.day), startDate, endDate),
        ...computeTaskOfDateForWeek(tasks.filter(r => r.type == TaskType.week), startDate, endDate),
        ...computeTaskOfDateForMonth(tasks.filter(r => r.type == TaskType.month), startDate, endDate)
    ]
};

export interface TaskView {
    taskId: number;
    date: Date;
    startHour?: string;
    endHour?: string;
    estimate?: string;
    isCritical: boolean;
}

function filterCommons(tasks: TaskInfo[], startDate: Date, endDate: Date) {
    return tasks.filter(r => {
        if (r.start && new Date(r.start) > endDate)
            return false;

        // if (r.end && r.type != TaskType.day && (new Date(r.end) < endDate))
        //     return false;

        return true;
    })
}

function computeTaskOfDateForDay(tasks: TaskInfo[], startDate: Date, endDate: Date) {
    const computeEndHour = (task: TaskInfo) => {
        if (!task.end)
            return;
        if (new Date(task.end) > startDate && new Date(task.end) < endDate)
            return getHourFromDateTime(task.end);
        return '00:58'
    };
    const computeIsCritical = (task: TaskInfo) => {
        if (!task.end)
            return false;
        const hourLeftToBeDone = convertTaskHourToNumber(task.estimate) || 0;
        return new Date(task.end).valueOf() - hourLeftToBeDone * 1000 < new Date().valueOf();
    };
    return tasks.map(task => {
        const ret: TaskView = {
            taskId: task.id,
            date: getDateFromDateTime(startDate),
            startHour: task.start && new Date(task.start) > startDate ? getHourFromDateTime(task.start) : undefined,
            endHour: computeEndHour(task),
            estimate: task.estimate,
            isCritical: computeIsCritical(task)
        };
        return ret;
    });
}

function computeTaskOfDateForWeek(tasks: TaskInfo[], startDate: Date, endDate: Date) {
    const weekDay = (startDate.getDay() + 1) % 7;
    tasks = tasks.filter(t => !!convertNumberToWeekDays(t.weekdays).find(r => r == weekDay));

    const computeIsCritical = (task: TaskInfo) => {
        const now = new Date();
        if (now > endDate)
            return true;
        const [h, m] = (task.endHour || '24:00').split(':').map(r => parseInt(r));
        if (h > now.getHours())
            return false;
        if (h < now.getHours())
            return true;
        return m < now.getMinutes();
    };

    return tasks.map(task => {
        const ret: TaskView = {
            taskId: task.id,
            date: getDateFromDateTime(startDate),
            startHour: task.startHour,
            endHour: task.endHour,
            estimate: task.estimate,
            isCritical: computeIsCritical(task)
        };
        return ret;
    });
}

function computeTaskOfDateForMonth(tasks: TaskInfo[], startDate: Date, endDate: Date) {
    const startDateinJalali = Persian.date.convertDateTimeToJalali(startDate);
    const theDaysCountInTheMonth = Persian.date.getJalaliMonthDaysCount(startDateinJalali.year, startDateinJalali.month);
    tasks = tasks.filter(t => Math.min(theDaysCountInTheMonth, t.monthDay || 1) == startDateinJalali.day);

    const computeIsCritical = (task: TaskInfo) => {
        const now = new Date();
        if (now > endDate)
            return true;
        const [h, m] = (task.endHour || '24:00').split(':').map(r => parseInt(r));
        if (h > now.getHours())
            return false;
        if (h < now.getHours())
            return true;
        return m < now.getMinutes();
    };

    return tasks.map(task => {
        const ret: TaskView = {
            taskId: task.id,
            date: getDateFromDateTime(startDate),
            startHour: task.startHour,
            endHour: task.endHour,
            estimate: task.estimate,
            isCritical: computeIsCritical(task)
        };
        return ret;
    });
}

function getHourFromDateTime(dateTime: string) {
    const d = new Date(dateTime);
    return `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
}

export function getDateFromDateTime(dateTime: string | Date) {
    if (typeof dateTime == 'string')
        dateTime = new Date(dateTime);
    dateTime.setHours(0);
    dateTime.setMinutes(0);
    dateTime.setSeconds(0);
    dateTime.setMilliseconds(0);
    return dateTime;
}

export function convertTaskHourToNumber(hour?: string): number | undefined {
    if (!hour)
        return;

    const p = hour.split(':');
    return parseInt(p[0]) * 60 + parseInt(p[1]);
}