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
    tasks = filterCommons(tasks, startDate, endDate);

    return [
        ...computeTaskOfDateForDay(tasks.filter(r => r.type == TaskType.day), ticks, startDate, endDate),
        ...computeTaskOfDateForWeek(tasks.filter(r => r.type == TaskType.week), ticks, startDate, endDate),
        ...computeTaskOfDateForMonth(tasks.filter(r => r.type == TaskType.month), ticks, startDate, endDate)
    ]
};


function filterCommons(tasks: TaskInfo[], startDate: Date, endDate: Date) {
    return tasks.filter(r => {
        if (r.start && new Date(r.start) > endDate)
            return false;

        // if (r.end && r.type != TaskType.day && (new Date(r.end) < endDate))
        //     return false;

        return true;
    })
}


