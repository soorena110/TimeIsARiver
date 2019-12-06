import * as React from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../../../Redux";
import Services from "../../../Services";
import {TaskInfo, TaskType} from "../../../Redux/DataState/Tasks/Models/TaskInfo";
import {SorTable, SorTableColumn} from "../../../Framework";
import commonColumns from "./commonColumns";
import TickMiniDisplay from "../../TicksPage/TickMiniDisplay";

interface Props {
    tasks?: { [id: string]: TaskInfo };
}

class DayTasks extends React.Component<Props> {
    constructor(props: any) {
        super(props);
        Services.tasksService.requestAllTasks()
    }

    _columns: SorTableColumn<TaskInfo>[] = [
        ...commonColumns,
        {
            accessor: 'id',
            title: '',
            render: id => <TickMiniDisplay taskId={id} forDate={new Date().toISOString().split('T')[0]}/>
        }
    ];

    render() {
        if (!this.props.tasks)
            return 'Loading ...';

        const data = (this.props.tasks as any).filter((r: TaskInfo) => r.type == TaskType.day);
        return <SorTable columns={this._columns} data={data}/>
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    tasks: state.tasks.tasks,
    ticks: state.tasks.ticks
});
export default connect(mapStateToProps)(DayTasks);