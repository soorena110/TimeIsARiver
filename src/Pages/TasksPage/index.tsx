import * as React from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../../Redux";
import {TaskType} from "../../Redux/DataState/Tasks/Models/TaskInfo";
import DayTasks from "./ListTypes/DayTasks";
import MonthTasks from "./ListTypes/MonthTasks";
import WeekTasks from "./ListTypes/WeekTasks";
import TaskTypeSelector from "../Common/TaskTypeSelector";
import './style.css';
import CreateOrEditTasksView from "./TopOptions/CreateOrEditTasksView";
import {ScrollbarContainer} from "react-lite-form-creator";
import withErrorBoundary from "../../Framework/ErrorBoundry";

interface State {
    showingTaskType: TaskType;
}

@withErrorBoundary
export default class TasksPage extends React.Component<any, State> {

    constructor(props: any) {
        super(props);
        this.state = {showingTaskType: TaskType.day}
    }

    _renderTasks() {
        switch (this.state.showingTaskType) {
            case TaskType.day:
                return <DayTasks/>;
            case TaskType.week:
                return <WeekTasks/>;
            case TaskType.month:
                return <MonthTasks/>;

            default:
                console.error('TaskType is not defined here : ' + this.state.showingTaskType)
        }
    }

    render() {
        return <div style={{display: 'flex', flexDirection: "column", height: "100%"}}>
            <div className="task-page-top-panel">
                <TaskTypeSelector selectedValue={this.state.showingTaskType}
                                  onChange={e => this.setState({showingTaskType: e.newValue})}/>
                <span style={{marginRight: 10}}>
                    <CreateOrEditTasksView/>
                </span>
            </div>
            <ScrollbarContainer style={{flex: 1}}>
                {this._renderTasks()}
            </ScrollbarContainer>
        </div>
    }
}


declare const module: any;
module.hot.accept('./index.tsx');