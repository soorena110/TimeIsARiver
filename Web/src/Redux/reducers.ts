import {tasksReducer} from "./DataState/Tasks";
import {combineReducers} from "redux";
import {addSetStateToReducer} from "redux-solid";
import {pagesReducer} from "./PageState";

const rawReducers = {
    tasks: tasksReducer,
    pages: pagesReducer
};

const combinedReducer = addSetStateToReducer(combineReducers(rawReducers));
export const reducers = (state: any, action: any) => {
    if (action.type == 'Reset')
        state = undefined;

    return combinedReducer(state, action)
};