import * as React from "react";
import {connect} from "react-redux";
import './style.css';
import {ApplicationState} from "../../../Redux";
import withErrorBoundary from "../../../Framework/ErrorBoundry";
import {DateTime} from "../../../Framework";
import {TickInfo, TickTypeNames} from "../../../Redux/DataState/Tasks/Models/TickInfo";

interface Props {
    tick?: TickInfo;
}

@withErrorBoundary
class TicksInfo extends React.Component<Props> {
    render() {
        const {tick} = this.props;
        if (!tick)
            return null;
        return <div className="tick-info">
            <div>id : <b>{tick.id}</b></div>
            <div>taskId : <b>{tick.taskId}</b></div>
            <div>tickType : <b>{TickTypeNames[tick.type]}</b></div>
            {tick.forDate && <div>forDate : <b><DateTime type="dateOnly">{tick.forDate}</DateTime></b></div>}
            {tick.start && <div>start : <b><DateTime>{tick.start}</DateTime></b></div>}
            {tick.end && <div>end : <b><DateTime>{tick.end}</DateTime></b></div>}
            {tick.postponeEnd && <div>postponeEnd : <b><DateTime>{tick.postponeEnd}</DateTime></b></div>}
        </div>
    }
}

const mapStateToProps = (state: ApplicationState) => {
    const tickId = state.pages.selectedTickId;
    return {
        tick: tickId && (state.tasks.ticks || {})[tickId]
    }
};
export default connect(mapStateToProps)(TicksInfo);