import * as React from "react";
import withErrorBoundary from "../../../Framework/ErrorBoundry";
import {convertTaskHourToNumber, TaskView} from "../../_utils/dateTimeUtils";
import {ApplicationState} from "../../../Redux";
import {connect} from "react-redux";
import {TaskInfo} from "../../../Redux/DataState/Tasks/Models/TaskInfo";
import Icon from "react-icons-kit";
import './styles.css';
import NowIndicator from "../NowIndicator";

const {ic_alarm} = require('react-icons-kit/md/ic_alarm');
const {ic_alarm_off} = require('react-icons-kit/md/ic_alarm_off');

interface Props {
    taskView: TaskView;
    task: TaskInfo;
}

@withErrorBoundary
class TaskRow extends React.Component<Props> {


    _renderSpan() {
        const ret = [];
        const {taskView} = this.props;

        const startOffset = (convertTaskHourToNumber(taskView.startHour) || -1) / 1440 * 100;
        const endOffset = (convertTaskHourToNumber(taskView.endHour) || 1441) / 1440 * 100;


        if (taskView.startHour && taskView.endHour)
            ret.push(<span key={'bar'} className="task-row-bar" style={{
                borderTopRightRadius: startOffset >= 0 ? 5 : 0,
                borderBottomRightRadius: startOffset >= 0 ? 5 : 0,
                borderTopLeftRadius: endOffset <= 100 ? 5 : 0,
                borderBottomLeftRadius: endOffset <= 100 ? 5 : 0,
                right: startOffset.toFixed(2) + '%',
                width: (endOffset - startOffset).toFixed(2) + '%'
            }}>{this.props.task.estimate}</span>);

        if (taskView.startHour)
            ret.push(<Icon key={'begin'} className="task-row-icon" icon={ic_alarm} style={{
                right: startOffset.toFixed(2) + '%',
            }}/>);
        if (taskView.endHour)
            ret.push(<Icon key={'end'} className="task-row-icon end" icon={ic_alarm_off} style={{
                right: (endOffset - 4).toFixed(2) + '%',
            }}/>);
        return ret;
    }

    render() {
        const className = "task-row" + (this.props.taskView.isCritical ? ' critical' : '');

        return <div className={className} style={{position: "relative"}}>
            {this._renderSpan()}
            <NowIndicator/>
        </div>
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: { taskView: TaskView }) => ({
    task: state.tasks.tasks && state.tasks.tasks[ownProps.taskView.taskId]
});
export default connect(mapStateToProps)(TaskRow);