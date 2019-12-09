import * as React from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../../Redux";
import withErrorBoundary from "../../Framework/ErrorBoundry";
import Services from "../../Services";
import {TaskInfo, TaskType} from "../../Redux/DataState/Tasks/Models/TaskInfo";
import computeTaskOfDate, {getDateFromDateTime, TaskView} from "../_utils/dateTimeUtils";
import TaskRow from "./TimeRow";
import './styles.css';
import {RouteComponentProps, withRouter} from "react-router-dom";
import Persian from "persian-info";
import Calendar from "./Calendar";
import TasksInfo from "./SelectedTaskInfo";
import TickMiniDisplay from "../Common/TickMiniDisplay";
import TicksInfo from "./SelectedTickInfo";
import TaskTypeSelector from "../Common/TaskTypeSelector";
import TickTypeSelector from "../Common/TickTypeSelector";
import {TickInfo, TickType} from "../../Redux/DataState/Tasks/Models/TickInfo";

interface Props extends RouteComponentProps<{ 'date': string }> {
    tasks?: { [id: string]: TaskInfo };
    ticks?: { [id: string]: TickInfo };
}

interface State {
    showingTaskType?: TaskType;
    showingTickType?: TickType | 'all';
}

@withErrorBoundary
class TasksOfDay extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {showingTickType: 'all'};
        Services.tasksService.requestAllTasks();
        Services.tasksService.requestAllTicks();
    }

    _getDate() {
        const theDateString = this.props.match.params.date;
        if (!theDateString)
            return new Date();

        const [year, month, day] = theDateString.split('-').map(r => parseInt(r));
        return Persian.date.convertJalaliToGregorian({year, month, day})
    }

    _getTasksOfCurrentDate() {
        if (!this.props.tasks)
            return [];

        const theDate = this._getDate();
        let allTasks: TaskInfo[] = (this.props.tasks as any).filter((r: TaskInfo) => Boolean(r));
        if (this.state.showingTaskType != undefined)
            allTasks = allTasks.filter(r => r.type == this.state.showingTaskType);

        if (this.state.showingTickType != undefined) {
            const forDate = this._getDate().toISOString().split('T')[0];
            allTasks = allTasks.filter(task => {
                if (!this.props.ticks) return false;

                const tick = (this.props.ticks as any).find((tick?: TickInfo) => tick && tick.forDate == forDate && tick.taskId == task.id) as TickInfo;
                const tickType = tick ? tick.type : TickType.todo;

                if (this.state.showingTickType == 'all')
                    return [TickType.todo, TickType.doing, TickType.postponed].indexOf(tickType) != -1;
                return tickType == this.state.showingTickType;
            });
        }
        const currentDayStart = getDateFromDateTime(theDate);
        return computeTaskOfDate(allTasks, currentDayStart, new Date(currentDayStart.valueOf() + 24 * 3600 * 1000));
    }

    _renderTableHeader() {
        return <thead>
        <tr>
            <th/>
            <th>
                <div style={{display: 'flex'}}>
                    {new Array(24).fill(1).map((r, ix) => (
                        <span key={ix} style={{
                            flex: 1, display: "flex", borderRight: 'solid 1px gray',
                            borderTopRightRadius: 5
                        }}>{ix}</span>
                    ))}
                </div>
            </th>
            <th/>
        </tr>
        </thead>
    }

    _renderTableBody(taskViews: TaskView[]) {
        return <tbody>
        {taskViews.map(taskView => {
            const task = (this.props.tasks || {})[taskView.taskId];
            return <tr key={taskView.taskId}
                       onMouseEnter={() => Services.pagesService.setSelectedTaskId(taskView.taskId)}
                       onMouseLeave={() => Services.pagesService.setSelectedTaskId(undefined)}>
                <td style={{width: 70, position: 'relative'}}>
                    {task.name}
                    {task.estimate && <span className="tasks-of-day-estimate-badge">
                        {task.estimate}
                    </span>}
                </td>
                <td>
                    <TaskRow taskView={taskView}/>
                </td>
                <td style={{width: 100}}>
                    <TickMiniDisplay taskId={taskView.taskId}
                                     forDate={taskView.date.toISOString().split('T')[0]}/>
                </td>
            </tr>
        })}
        </tbody>
    }

    _renderTopConfigsAndInfos() {
        return <div className="tasks-of-day-top-configs-and-infos">
            <span style={{margin: 5}}><Calendar/></span>
            <span style={{margin: 5}}>
                <TaskTypeSelector canBeUnset
                                  selectedValue={this.state.showingTaskType as any}
                                  onChange={e => this.setState({showingTaskType: e.newValue})}/>
                <br/>
                <TickTypeSelector selectedValue={this.state.showingTickType}
                                  onChange={e => this.setState({showingTickType: e.newValue})}/>
            </span>
            <div style={{position: 'absolute', bottom: 0, left: 0}}>
                <TicksInfo/>
                <TasksInfo/>
            </div>
        </div>
    }

    _renderTable() {
        const taskViews = this._getTasksOfCurrentDate();
        if (!taskViews.length)
            return;

        return <div style={{overflow: 'auto', width: '100%'}}>
            <div style={{minWidth: 500}}>
                <table className="tasks-of-day" cellSpacing={0}>
                    {this._renderTableHeader()}
                    {this._renderTableBody(taskViews)}
                </table>
            </div>
        </div>
    }

    render() {
        return <>
            {this._renderTopConfigsAndInfos()}
            {this._renderTable()}
            <div style={{height: 200}}/>
        </>
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    tasks: state.tasks.tasks,
    ticks: state.tasks.ticks
});
export default withRouter(connect(mapStateToProps)(TasksOfDay));


declare const module: any;
module.hot.accept('./index.tsx');