import {SorTableColumn} from "../../../Framework/SorTable";
import {TaskInfo} from "../../../Redux/DataState/Tasks/Models/TaskInfo";
import * as React from "react";
import CreateOrEditTasksView from "../TopOptions/CreateOrEditTasksView";
import DeleteTaskView from "../TopOptions/DeleteTaskView";
import Persian from "persian-info";
import {convertToJalaliDateTime} from "../../../../utils/dateTimeReactUtils";


const commonColumns: SorTableColumn<TaskInfo>[] = [
    {
        accessor: "id",
        title: 'شماره',
        sortable: true
    },
    {
        accessor: "name",
        title: 'نام',
        sortable: true
    },
    {
        accessor: "description",
        title: 'توضیح',
        render: desc => desc && desc.substr(0, 30),
        sortable: true,
        tdStyle: {color: "gray"}
    },
    {
        accessor: "start",
        title: 'شروع',
        render: convertToJalaliDateTime,
        sortable: true
    },
    {
        accessor: "end",
        title: 'پایان',
        render: convertToJalaliDateTime,
        sortable: true
    },
    {
        accessor: "estimate",
        title: 'تخمین انجام',
        sortable: true
    },
    {
        accessor: "lastUpdate",
        title: 'آخرین آپدیت',
        render: convertToJalaliDateTime,
        sortable: true
    },
    {
        accessor: 'id',
        title: '',
        render: id => {
            return <React.Fragment key={id}>
                <CreateOrEditTasksView isMinifiedButton id={id}/>
                <DeleteTaskView id={id}/>
            </React.Fragment>
        },
        sortable: true
    },
];

export default commonColumns;