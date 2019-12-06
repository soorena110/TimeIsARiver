import * as React from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../../Redux";
import withErrorBoundary from "../../Framework/ErrorBoundry";
import Services from "../../Services";
import {TaskInfo, TaskType} from "../../Redux/DataState/Tasks/Models/TaskInfo";
import computeTaskOfDate, {getDateFromDateTime} from "../_utils/dateTimeUtils";
import TaskRow from "./TimeRow";
import './styles.css';
import {RouteComponentProps, withRouter} from "react-router-dom";
import Persian from "persian-info";
import Calendar from "./Calendar";
import TasksInfo from "./SelectedTaskInfo";
import TickMiniDisplay from "../TicksPage/TickMiniDisplay";
import TicksInfo from "./SelectedTickInfo";
import TaskTypeSelector from "../TasksPage/TopOptions/TaskTypeSelector";

interface Props extends RouteComponentProps<{ 'date': string }> {
    tasks?: { [id: string]: TaskInfo };
}

interface State {
    taskType?: TaskType;
}

@withErrorBoundary
class TasksOfDay extends React.Component<Props, State> {
    constructor(props: any) {
        super(props);
        this.state = {};
        Services.tasksService.requestAllTasks();
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
        let allTasks = (this.props.tasks as any).filter((r: TaskInfo) => Boolean(r));
        if (this.state.taskType != undefined)
            allTasks = allTasks.filter((r: TaskInfo) => r.type == this.state.taskType)

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

    _renderTableBody() {
        const taskViews = this._getTasksOfCurrentDate();

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

    _renderTopConfigsAndInfos(){
        return <div style={{position: 'relative', display: 'flex'}}>
            <Calendar/>
            <span style={{margin: 5}}>
                    <TaskTypeSelector canBeUnset
                                      selectedValue={this.state.taskType as any}
                                      onChange={e => this.setState({taskType: e.newValue})}/>
                </span>
            <div style={{position: 'absolute', bottom: 0, left: 0}}>
                <TicksInfo/>
                <TasksInfo/>
            </div>
        </div>
    }

    render() {
        return <>
            {this._renderTopConfigsAndInfos()}
            <table className="tasks-of-day" cellSpacing={0}>
                {this._renderTableHeader()}
                {this._renderTableBody()}
            </table>
        </>
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    tasks: state.tasks.tasks
});
export default withRouter(connect(mapStateToProps)(TasksOfDay));


declare const module: any;
module.hot.accept();