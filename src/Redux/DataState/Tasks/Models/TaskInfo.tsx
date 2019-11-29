export interface TaskInfo {
    _id: number;
    name: string;
    description: string;
    start: string;
    end: string;
    estimate: string;
    type: TaskType;

    startHour?: string;
    endHour?: string;
    weekdays?: number;
    monthDay?: number;

    lastUpdate: string;
}

export enum TaskType {
    day = 0,
    week = 1,
    month = 2
}

export enum WeekDay {
    saturday = 1,
    sunday = 2,
    monday = 4,
    tuesday = 8,
    wednesday = 16,
    thursday = 32,
    friday = 64
}

export const TaskTypeName = {
    [TaskType.day]:'روز',
    [TaskType.week]:'هفته',
    [TaskType.month]:'ماه'
} as any;


export const WeekDayNames = {
    [WeekDay.saturday]:'شنبه',
    [WeekDay.sunday]:'یکشنبه',
    [WeekDay.monday]:'دوشنبه',
    [WeekDay.tuesday]:'سه‌شنبه',
    [WeekDay.wednesday]:'چهارشنبه',
    [WeekDay.thursday]:'پنجشنبه',
    [WeekDay.friday]:'جمعه'
} as any;
