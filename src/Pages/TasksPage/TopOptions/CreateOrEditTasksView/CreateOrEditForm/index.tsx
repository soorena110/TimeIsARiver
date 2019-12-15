import * as React from "react";
import {BoxFormFieldProps} from "react-lite-form-creator/src/Form/BoxForm/propsModels";
import {TaskInfo, TaskType} from "../../../../../Redux/DataState/Tasks/Models/TaskInfo";
import {FormBuilder} from "react-lite-form-creator";
import TaskTypeSelector from "../../../../Common/TaskTypeSelector";
import Services from "../../../../../Services";
import WeekDaysSelector from "./WeekDaysSelector";

interface Props {
    editingTask?: TaskInfo;
}

interface State {
    creatingOrEditingTask: Partial<TaskInfo>;
}

export default class CreateOrEditForm extends React.Component<Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            creatingOrEditingTask: {
                ...(this.props.editingTask || {
                    type: TaskType.day
                })
            }
        };
    }

    async submit() {
        let isSuccess = false;
        if (this.state.creatingOrEditingTask.id)
            await Services.tasksService.editTask(this.state.creatingOrEditingTask, () => isSuccess = true);
        else
            await Services.tasksService.createTask(this.state.creatingOrEditingTask, () => {
                isSuccess = true
            });
        return isSuccess;
    }

    _getCreateFormFields(): BoxFormFieldProps[] {
        return [
            {
                name: 'type',
                label: 'نوع تسک',
                type: 'content',
                render: e => <TaskTypeSelector selectedValue={e.values['type']}
                                               onChange={f => e.values['type'] = f.newValue}/>
            },
            {
                name: 'name',
                label: 'نام تسک',
                type: 'string',
                validation: {
                    isRequired: true,
                    otherValidations: [{
                        conditionChecker: e => e.values['name'] && e.values['name'].length < 4,
                        message: 'تعداد کاراکترهای نام تسک باید حداقل 4 عدد باشد.'
                    }]
                }
            },
            {
                name: 'description',
                label: 'توضیحات',
                type: 'string'
            },
            {
                name: 'start',
                label: 'شروع',
                type: 'datetime'
            },
            {
                name: 'end',
                label: 'پایان',
                type: 'datetime'
            },
            {
                name: 'estimate',
                label: 'تخمین',
                type: 'time'
            },
            {
                name: 'weekdays',
                label: 'روز هفته',
                type: 'content',
                render: e => <WeekDaysSelector selectedValue={e.values['weekdays']}
                                               onChange={f => e.values['weekdays'] = f.newValue}/>,
                onlyShowIf: e => e.values['type'] == TaskType.week
            },
            {
                name: 'monthDay',
                label: 'روز ماه',
                type: 'integer',
                validation: {
                    minValue: 1,
                    maxValue: 31
                },
                onlyShowIf: e => e.values['type'] == TaskType.month
            },
            {
                name: 'startHour',
                label: 'ساعت شروع هر تسک (هفته و ماه)',
                type: 'time',
                onlyShowIf: e => e.values['type'] == TaskType.week || e.values['type'] == TaskType.month,
            },
            {
                name: 'endHour',
                label: 'ساعت پایان هر تسک (هفته و ماه)',
                type: 'time',
                onlyShowIf: e => e.values['type'] == TaskType.week || e.values['type'] == TaskType.month
            }
        ]
    }

    render() {
        return <FormBuilder values={this.state.creatingOrEditingTask}
                            fields={this._getCreateFormFields()}
                            isEditForm={!!this.props.editingTask}
                            onChange={e => this.setState({creatingOrEditingTask: e.newValue})}/>
    }
}