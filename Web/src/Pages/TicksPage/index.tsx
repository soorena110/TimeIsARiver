import * as React from "react";
import {connect} from "react-redux";
import {ApplicationState} from "../../Redux";
import './style.css';
import {ScrollbarContainer} from "react-lite-form-creator";
import withErrorBoundary from "../../Framework/ErrorBoundry";
import {DateTime, SorTable, SorTableColumn} from "../../Framework";
import {TaskInfo} from "../../Redux/DataState/Tasks/Models/TaskInfo";
import {TickInfo, TickType} from "../../Redux/DataState/Tasks/Models/TickInfo";
import Services from "../../Services";
import TasksInfo from "../TasksOfDay/SelectedTaskInfo";
import {convertToJalaliDateTime} from "../../../utils/dateTimeReactUtils";
import TickMiniDisplay from "../Common/TickMiniDisplay";
import TickTypeSelector from "../Common/TickTypeSelector";

interface Props {
    ticks?: { [key: string]: TickInfo | undefined }
    tasks?: { [key: string]: TaskInfo | undefined }
}

interface State {
    showingTickType?: TickType;
}

@withErrorBoundary
class TicksPage extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.state = {};

        Services.tasksService.startRequestingTasks();
        Services.tasksService.startRequestingTicks();
    }


    _columns: SorTableColumn<TickInfo>[] = [
        {
            accessor: 'id',
            title: 'شماره',
            sortable: true
        },
        {
            accessor: 'taskId',
            title: 'تسک',
            render: taskId => <span onMouseEnter={() => Services.pagesService.setSelectedTaskId(taskId)}
                                    onMouseLeave={() => Services.pagesService.setSelectedTaskId(undefined)}>
                {((this.props.tasks || {})[taskId] || {}).name}
            </span>,
            sortable: true
        },
        {
            accessor: 'start',
            title: 'شروع انجام',
            render: convertToJalaliDateTime,
            sortable: true
        },
        {
            accessor: 'end',
            title: 'پایان انجام',
            render: convertToJalaliDateTime,
            sortable: true
        },
        {
            accessor: 'postponeEnd',
            title: 'تاریخ پشت انداز',
            render: convertToJalaliDateTime,
            sortable: true
        },
        {
            accessor: 'forDate',
            title: 'برای روز',
            render: r => <DateTime type="dateOnly">{r}</DateTime>,
            sortable: true
        },
        {
            accessor: 'lastUpdate',
            title: 'آخرین آپدیت',
            sortable: true,
            render: convertToJalaliDateTime
        },
        {
            accessor: 'type',
            title: '',
            render: (type, row) => <TickMiniDisplay taskId={row.taskId} forDate={row.forDate}/>
        }
    ];

    _getTicks(): TickInfo[] {
        if (!this.props.ticks)
            return [];

        let ret = Object.values(this.props.ticks) as TickInfo[];
        if (this.state.showingTickType != undefined)
            ret = ret.filter(r => r.type == this.state.showingTickType);

        return ret;
    }

    render() {
        return <div style={{display: 'flex', flexDirection: "column", height: "100%"}}>
            <div className="tick-page-top-panel">
                <TasksInfo/>
                <TickTypeSelector selectedValue={this.state.showingTickType}
                                  onChange={e => this.setState({showingTickType: e.newValue})}/>
            </div>
            <ScrollbarContainer style={{flex: 1}}>
                <SorTable columns={this._columns} data={this._getTicks()}/>
            </ScrollbarContainer>
        </div>
    }
}

const mapStateToProps = (state: ApplicationState) => ({
    ticks: state.tasks.ticks,
    tasks: state.tasks.tasks
});
export default connect(mapStateToProps)(TicksPage);


declare const module: any;
if (module.hot)
    module.hot.accept('./index.tsx');