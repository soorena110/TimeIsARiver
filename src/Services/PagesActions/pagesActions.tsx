import {dispatch, getState} from "../../Redux";

export const pagesActions = {
    setSelectedTaskId(taskId: number | undefined) {
        if (taskId != getState().pages.selectedTaskId)
            dispatch({type: 'set_selectedTaskId', value: taskId});
    }
};