import Persian from "persian-info";
import * as React from "react";

export const numberToHour = (num?: number) => {
    if (num == undefined)
        return num;
    const hours = Math.floor(num);
    const minutes = Math.round((num - hours) * 60);

    if (hours)
        return `${hours}h ${minutes}m`;
    else return `${minutes}m`;
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

export function convertToJalaliDateTime(dateTime: any) {
    if (!dateTime)
        return;
    const jdate = Persian.date.convertDateTimeToJalaliString(dateTime);

    const d = new Date(dateTime);
    const jtime = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`;
    return <>
            <span>{jdate}</span>{'  '}
        <span className="text-gray">{jtime}</span>
        </>
}