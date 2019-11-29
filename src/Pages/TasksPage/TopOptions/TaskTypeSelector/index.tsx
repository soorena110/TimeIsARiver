import {TaskType, TaskTypeName} from "../../../../Redux/DataState/Tasks/Models/TaskInfo";
import * as React from "react";
import {DropDown} from "react-lite-form-creator";
import {BoxDropDownItem} from "react-lite-form-creator/dist/Form/DropDown";
import './style.css';

interface Props {
    selectedValue: TaskType;
    onChange: (e: { newValue: TaskType }) => void;
}

const items = [TaskType.day, TaskType.week, TaskType.month].map(key => ({
    title: TaskTypeName[key],
    value: key
}) as BoxDropDownItem);

const TaskTypeSelector = (props: Props) => {
    return <DropDown name="TaskTypeSelector"
                     value={props.selectedValue}
                     className="task-type-selector info"
                     items={items} label="نوع تسک"
                     onChange={e => props.onChange({newValue: e.newValue})}/>
};

export default TaskTypeSelector;