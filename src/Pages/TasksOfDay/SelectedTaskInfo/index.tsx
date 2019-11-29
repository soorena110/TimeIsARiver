import * as React from "react";
import {connect} from "react-redux";
import './style.css';
import {ApplicationState} from "../../../Redux";
import withErrorBoundary from "../../../Framework/ErrorBoundry";
import {TaskInfo} from "../../../Redux/DataState/Tasks/Models/TaskInfo";
import {DateTime} from "../../../Framework";
import {convertNumberToWeekDays} from "../../_utils";

interface Props {
    task?: TaskInfo;
}

@withErrorBoundary
class TasksInfo extends React.Component<Props> {
    render() {
        const {task} = this.props;
        if (!task)
            return null;
        return <div className="task-info">
            <div>id : <b>{task._id}</b></div>
            <div>name : <b>{task.name}</b></div>
            {task.start && <div>start : <b><DateTime>{task.start}</DateTime></b></div>}
            {task.end && <div>end : <b><DateTime>{task.end}</DateTime></b></div>}
            {task.estimate && <div>estimate : <b>{task.estimate}</b></div>}
            {task.startHour && <div>startHour : <b>{task.startHour}</b></div>}
            {task.endHour && <div>startHour : <b>{task.endHour}</b></div>}
            {task.weekdays && <div>weekDays : <b>{convertNumberToWeekDays(task.weekdays)}</b></div>}
            {task.description && <>
                <div>description :</div>
                <div><b>{task.description}</b></div>
            </>}
        </div>
    }
}

const mapStateToProps = (state: ApplicationState) => {
    const taskId = state.pages.selectedTaskId;
    return {
        task: taskId && (state.tasks.tasks || {})[taskId]
    }
};
export default connect(mapStateToProps)(TasksInfo);


declare const module: any;
module.hot.accept();