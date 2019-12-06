import * as React from "react";
import {connect} from "react-redux";
import './style.css';
import {ApplicationState} from "../../../Redux";
import withErrorBoundary from "../../../Framework/ErrorBoundry";
import {
    TickInfo,
    TickType,
    TickTypeColors,
    TickTypeIcons,
    TickTypeNames
} from "../../../Redux/DataState/Tasks/Models/TickInfo";
import Icon from "react-icons-kit";
import {DropDownItem, PopupMenu} from "react-lite-form-creator";
import Services from "../../../Services";


interface Props {
    taskId: number;
    forDate: string;

    tick?: TickInfo
}

interface State {
}

@withErrorBoundary
class TickMiniDisplay extends React.Component<Props, State> {

    _typesDropDownItems: DropDownItem[] = [TickType.todo, TickType.doing, TickType.done, TickType.canceled, TickType.postponed]
        .map(type => ({
            value: type,
            title: TickTypeNames[type],
            content: <span style={{color: TickTypeColors[type]}}>
                <Icon icon={TickTypeIcons[type]}/>
                {' '}
                {TickTypeNames[type]}
            </span>,
            onClick: () => Services.tasksService.setTick(type, this.props.taskId, this.props.forDate)
        }));


    _renderTrigger() {
        const type = (this.props.tick || {}).type || TickType.todo;

        return <span style={{background: TickTypeColors[type], color: "white", padding: 4, borderRadius: 4}}>
            <Icon icon={TickTypeIcons[type]}/>
            {' '}
            {TickTypeNames[type]}
        </span>;
    }

    render() {
        return <PopupMenu name="popup"
                          trigger={this._renderTrigger()}
                          items={this._typesDropDownItems}/>
    }
}

const mapStateToProps = (state: ApplicationState, ownProps: { taskId: number, forDate: string }) => {
    const tick = (state.tasks.ticks as any || []).find((r: TickInfo) => r && r.taskId == ownProps.taskId && r.forDate == ownProps.forDate);
    return {
        tick
    }
};
export default connect(mapStateToProps)(TickMiniDisplay);