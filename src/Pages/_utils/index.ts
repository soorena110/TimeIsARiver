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
