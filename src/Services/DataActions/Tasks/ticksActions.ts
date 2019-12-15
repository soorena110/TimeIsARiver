import Ajaxious from "ajaxious";
import {dispatch, getState} from "../../../Redux";
import {TickInfo, TickType} from "../../../Redux/DataState/Tasks/Models/TickInfo";
import {addTaskToSyncs, addTickToSyncs} from "../../SourceManament/Sync/utils";

export const ticksActions = {
    requestAllTicks: () => {
        if (getState().tasks.ticks || getState().tasks.ticks_flag['all'])
            return;

        dispatch({type: 'flag_ticks', key: 'all'});
        return Ajaxious.get('/ticks').then(res => {
            const unflagAction = {type: 'unflag_ticks', key: 'all'};
            if (res.isSuccess) {
                dispatch([
                    {type: 'set_ticks', data: res.data},
                    unflagAction
                ]);
            } else dispatch(unflagAction);

            return res;
        });
    },


    async setTick(type: TickType, taskId: number, forDate: string) {
        const state = getState().tasks;
        const flagKey = `set_${type}_${forDate}`;

        if (state.ticks_flag[flagKey])
            return;

        const theTick = (state.ticks as any || []).find((r?: TickInfo) => r && r.taskId == taskId && r.forDate == forDate) as TickInfo;
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