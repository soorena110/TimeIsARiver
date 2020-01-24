import * as React from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../../../Redux";
import Services from "../../../Services";
import {TaskInfo, TaskType} from "../../../Redux/DataState/Tasks/Models/TaskInfo";
import {SorTable, SorTableColumn} from "../../../Framework";
import commonColumns from "./commonColumns";
import {convertNumberToWeekDays} from "../../../../utils/weekTaskUtils";

interface Props {
    tasks?: { [id: string]: TaskInfo };
}

class WeekTasks extends React.Component<Props> {
    constructor(props: any) {
        super(props);
        Services.tasksService.startRequestingTasks()
    }

    _columns: SorTableColumn<TaskInfo>[] = [
        ...commonColumns,
        {
            accessor: "weekdays",
            title: 'روزهای هفته',
            render: wds => convertNumberToWeekDays(wds)
        },
        {
            accessor: "startHour",
            title:
                'ساعت شروع'
        },
        {
            accessor: "endHour",
            title:
                'ساعت پایان'
        }
    ];

    render() {
        if (!this.props.tasks)
            return 'Loading ...';

        const data = (this.props.tasks as any).filter((r: TaskInfo) => r.type == TaskType.week);
        return <SorTable columns={this._columns} data={data}/>
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    tasks: state.tasks.tasks
});
export default connect(mapStateToProps)(WeekTasks);