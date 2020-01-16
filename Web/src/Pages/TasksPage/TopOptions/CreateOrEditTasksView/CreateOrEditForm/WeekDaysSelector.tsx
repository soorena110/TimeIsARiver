import * as React from "react";
import {WeekDay, WeekDayNames} from "../../../../../Redux/DataState/Tasks/Models/TaskInfo";
import {Check} from "react-lite-form-creator";

interface Props {
    selectedValue: number;
    onChange: (e: { newValue: number }) => void;
}

const dayArray = [
    WeekDay.saturday,
    WeekDay.sunday,
    WeekDay.monday,
    WeekDay.tuesday,
    WeekDay.wednesday,
    WeekDay.thursday,
    WeekDay.friday,
];

function getNewValue(prevValue: number, index: number, check: boolean) {
    if (check)
        return prevValue | Math.pow(2, index);
    return prevValue & ~Math.pow(2, index);
}

function WeekDaysSelector(props: Props) {
    let val = props.selectedValue;
    return <>{dayArray.map((r, ix) => {
        const isChecked = val % 2 == 1;
        val = Math.floor(val / 2);
        return <Check key={ix} label={WeekDayNames[r]} value={isChecked}
                      onChange={e => {
                          if (!props.onChange) return;
                          const newValue = getNewValue(props.selectedValue, ix, e.newValue);
                          props.onChange({newValue})
                      }}/>
    })}</>
}

export default WeekDaysSelector