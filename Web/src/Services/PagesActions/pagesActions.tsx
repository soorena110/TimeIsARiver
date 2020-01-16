import {dispatch, getState} from "../../Redux";

export const pagesActions = {
    setSelectedTaskId(taskId: number | undefined) {
        if (taskId != getState().pages.selectedTaskId)
            dispatch({type: 'set_selectedTaskId', value: taskId});
    },
    setSelectedTickId(tickId: number | undefined) {
        if (tickId != getState().pages.selectedTickId)
            dispatch({type: 'set_selectedTickId', value: tickId});
    }
};