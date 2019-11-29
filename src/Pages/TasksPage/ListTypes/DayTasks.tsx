import * as React from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../../../Redux";
import Services from "../../../Services";
import {TaskInfo, TaskType} from "../../../Redux/DataState/Tasks/Models/TaskInfo";
import {SorTable, SorTableColumn} from "../../../Framework";
import {numberToHour} from "../../_utils";
import CreateOrEditTasksView from "../TopOptions/CreateOrEditTasksView";
import DeleteTaskView from "../TopOptions/DeleteTaskView";
import commonColumns from "./commonColumns";

interface Props {
    tasks?: { [id: string]: TaskInfo };
}

class DayTasks extends React.Component<Props> {
    constructor(props: any) {
        super(props);
        Services.tasksService.requestAllTasks()
    }

    render() {
        if (!this.props.tasks)
            return 'Loading ...';

        const data = (this.props.tasks as any).filter((r: TaskInfo) => r.type == TaskType.day);
        return <SorTable columns={commonColumns} data={data}/>
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    tasks: state.tasks.tasks
});
export default connect(mapStateToProps)(DayTasks);