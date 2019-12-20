import Persian from "persian-info";
import * as React from "react";

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