const {thumbsODown} = require('react-icons-kit/fa/thumbsODown');
const {thumbsOUp} = require('react-icons-kit/fa/thumbsOUp');
const {listOl} = require('react-icons-kit/fa/listOl');
const {magic} = require('react-icons-kit/fa/magic');
const {bicycle} = require('react-icons-kit/fa/bicycle');

export interface TickInfo {
    id: number;
    taskId: number;
    type: TickType;
    forDate: string;
    start: string;
    end: string;
    postponeEnd: string;
    lastUpdate: string;

    _unique?: string;
}

export enum TickType {
    todo,
    doing,
    done,
    canceled,
    postponed
}

export const TickTypeNames = {
    [TickType.todo]: 'تودو',
    [TickType.done]: 'انجام‌شده',
    [TickType.doing]: 'درحال انجام',
    [TickType.canceled]: 'کنسل‌شده',
    [TickType.postponed]: 'تعویقی'
} as any;

export const TickTypeIcons = {
    [TickType.todo]: listOl,
    [TickType.done]: thumbsOUp,
    [TickType.doing]: bicycle,
    [TickType.canceled]: thumbsODown,
    [TickType.postponed]: magic
} as any;

export const TickTypeColors = {
    [TickType.todo]: 'yellowgreen',
    [TickType.done]: 'deepskyblue',
    [TickType.doing]: 'green',
    [TickType.canceled]: 'red',
    [TickType.postponed]: 'orange'
} as any;

export const getTickUniqueId = (tick: { taskId: number, forDate: string }) => `${tick.taskId}_${tick.forDate}`;