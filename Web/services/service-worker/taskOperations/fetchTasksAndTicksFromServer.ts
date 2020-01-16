import {tasksDB, ticksDB} from "../../../sync/DexieDB";
import {TaskInfo} from "../../../src/Redux/DataState/Tasks/Models/TaskInfo";
import {TickInfo} from "../../../src/Redux/DataState/Tasks/Models/TickInfo";
import {initServerSetting} from "../../../utils/ajaxiousInit";
import Ajaxious from "ajaxious";

initServerSetting();

export default async () => await Promise.all([fetchTasksFromServer(), fetchTicksFromServer()]);

const fetchTasksFromServer = async () => {
    try {
        const res = await Ajaxious.get('tasks');
        const tasks: TaskInfo[] = await res.data;

        await tasksDB.clear();
        await tasksDB.bulkAdd(tasks);
    } catch (e) {
        console.error(e);
    }
};

const fetchTicksFromServer = async () => {
    try {
        const res = await Ajaxious.get('ticks');
        const ticks: TickInfo[] = await res.data;
        ticks.forEach(t => t.forDate = t.forDate.split('T')[0]);

        await ticksDB.clear();
        await ticksDB.bulkAdd(ticks);
    } catch (e) {
        console.error(e);
    }
};