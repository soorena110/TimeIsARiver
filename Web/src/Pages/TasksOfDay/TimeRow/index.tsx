import * as React from "react";
import withErrorBoundary from "../../../Framework/ErrorBoundry";
import {TaskView} from "../../../../utils/tasksUtils";
import Icon from "react-icons-kit";
import './styles.css';
import NowIndicator from "../NowIndicator";
import {convertTaskHourToNumber} from "../../../../utils/dateTimeUtils";
import {TickType} from "../../../Redux/DataState/Tasks/Models/TickInfo";

const {ic_alarm} = require('react-icons-kit/md/ic_alarm');
const {ic_alarm_off} = require('react-icons-kit/md/ic_alarm_off');

interface Props {
    taskView: TaskView;
}

@withErrorBoundary
export default class TaskRow extends React.Component<Props> {
    _renderSpan() {
        const ret = [];
        const {taskView} = this.props;

        const startOffset = (convertTaskHourToNumber(taskView.startHour) || -1) / 1440 * 100;
        const endOffset = (convertTaskHourToNumber(taskView.endHour) || 1441) / 1440 * 100;



        if (taskView.startHour)
            ret.push(<Icon key={'begin'} className="task-row-icon" icon={ic_alarm} style={{
                right: startOffset.toFixed(2) + '%',
            }}/>);
        if (taskView.endHour)
            ret.push(<Icon key={'end'} className="task-row-icon end" icon={ic_alarm_off} style={{
                right: (endOffset - 2).toFixed(2) + '%',
            }}/>);

        if (taskView.startHour && taskView.endHour)
            ret.push(<span key={'bar'} className="task-row-bar" style={{
                right: (startOffset + 2).toFixed(2) + '%',
                width: (endOffset - startOffset - 4).toFixed(2) + '%'
            }}>{this.props.taskView.task.estimate}</span>);

        return ret;
    }

    _renderTaskRowBarBetween(){

    }

    _getClassOfRow() {
        switch ((this.props.taskView.tick || {}).type) {
            case TickType.done:
                return 'done';
            case TickType.doing:
                return 'doing';
            case TickType.canceled:
                return 'canceled';
            case TickType.postponed:
                return 'postponed';


            default:
                if (this.props.taskView.toleranceMinutes <= 0)
                    return 'critical';
                else if (this.props.taskView.toleranceMinutes <= 15)
                    return 'warned';
        }
    }

    render() {
        let className = "task-row " + this._getClassOfRow();


        return <div className={className} style={{position: "relative"}}>
            {this._renderSpan()}
            <NowIndicator/>
        </div>
    }
}