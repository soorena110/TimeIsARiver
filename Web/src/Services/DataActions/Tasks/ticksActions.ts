import Ajaxious from "ajaxious";
import {dispatch, getState} from "../../../Redux";
import {TickInfo, TickType} from "../../../Redux/DataState/Tasks/Models/TickInfo";
import {addTickToSyncs} from "../../../../sync/utils";


let requestInterval;
export const ticksActions = {
    async startRequestingTicks() {
        requestInterval = setInterval(requestAllTicks, 40000);
        await requestAllTicks();
    },

    async setTick(type: TickType, taskId: number, forDate: string) {
        const state = getState().tasks;
        const flagKey = `set_${type}_${forDate}`;

        if (state.ticks_flag[flagKey])
            return;

        const theTick = Object.values(state.ticks || {}).find((r?: TickInfo) => r && r.taskId == taskId && r.forDate == forDate) as TickInfo;
        if (theTick && theTick.type == type)
            return;

        dispatch({type: 'flag_ticks', key: flagKey});

        let tick = {taskId, forDate, type};
        const res = await Ajaxious.put('/ticks', tick);


        if (res.status <= 0)
            await addTickToSyncs('update', tick);
        else tick = res.data;

        if (res.isSuccess || res.status <= 0) {
            dispatch([
                {type: 'add_ticks', data: tick},
                {type: 'unflag_ticks', key: flagKey}
            ]);
        } else dispatch({type: 'unflag_ticks', key: flagKey});

        return res;
    }
};


const requestAllTicks = async () => {
    if (getState().tasks.ticks_flag['requesting_all'])
        return;

    dispatch({type: 'flag_ticks', key: 'requesting_all'});
    const res = await Ajaxious.get('/ticks');
    if (res.isSuccess)
        dispatch([
            {type: 'set_ticks', data: res.data},
            {type: 'unflag_ticks', key: 'requesting_all'},
        ]);
    else dispatch({type: 'unflag_ticks', key: 'requesting_all'});

    return res;
};