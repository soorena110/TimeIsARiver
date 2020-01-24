import {TaskInfo, TaskType} from "../src/Redux/DataState/Tasks/Models/TaskInfo";
import {TickInfo} from "../src/Redux/DataState/Tasks/Models/TickInfo";
import {computeTaskOfDateForDay} from "./dayTaskUtils";
import {computeTaskOfDateForWeek} from "./weekTaskUtils";
import {computeTaskOfDateForMonth} from "./monthTaskUtils";


export interface TaskView {
    date: Date;
    startHour?: string;
    endHour?: string;
    estimate?: string;
    toleranceMinutes: number;

    task: TaskInfo;
    tick?: TickInfo;
}

export default function computeTaskOfDate(tasks: TaskInfo[], ticks: TickInfo[], startDate: Date, endDate: Date): TaskView[] {
    tasks = tasks.filter(Boolean);
    tasks = filterCommons(tasks, startDate, endDate);

    const taskViews = [
        ...computeTaskOfDateForDay(tasks.filter(r => r.type == TaskType.day), ticks, startDate, endDate),
        ...computeTaskOfDateForWeek(tasks.filter(r => r.type == TaskType.week), ticks, startDate, endDate),
        ...computeTaskOfDateForMonth(tasks.filter(r => r.type == TaskType.month), ticks, startDate, endDate)
    ];

    taskViews.sort((m, n) => {
        if (m.endHour == n.endHour) return 0;
        if (!m.endHour) return 1;
        if (!n.endHour) return -1;

        return m.endHour > n.endHour ? 1 : -1;
    });
    return taskViews;
};


function filterCommons(tasks: TaskInfo[], startDate: Date, endDate: Date) {
    return tasks.filter(r => !(r.start && new Date(r.start) > endDate))
}


