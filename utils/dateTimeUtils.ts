export function getHourFromDateTime(dateTime: string) {
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