import Ajaxious from "ajaxious";
import {dispatch, getState} from "../../../Redux";
import {TickInfo, TickType} from "../../../Redux/DataState/Tasks/Models/TickInfo";

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


    setTick(type: TickType, taskId: number, forDate: string) {
        const state = getState().tasks;
        const flagKey = `set_${type}_${forDate}`;

        if (state.ticks_flag[flagKey])
            return;

        const theTick = (state.ticks as any || []).find((r?: TickInfo) => r && r.taskId == taskId && r.forDate == forDate) as TickInfo;
        if (theTick && theTick.type == type)
            return;

        dispatch({type: 'flag_ticks', key: flagKey});
        return Ajaxious.put('/ticks', {taskId, forDate, type}).then(res => {
            const unflagAction = {type: 'unflag_ticks', key: flagKey};
            if (res.isSuccess) {
                dispatch([
                    {type: 'add_ticks', data: res.data},
                    unflagAction
                ]);
            } else dispatch(unflagAction);

            return res;
        });
    }
};