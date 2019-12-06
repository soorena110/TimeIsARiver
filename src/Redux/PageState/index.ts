import {ReducerCreator} from "redux-solid";
import defaultState from "./defaultState";

export const pagesReducer = new ReducerCreator()
    .withVariableReducer('selectedTaskId')
    .withVariableReducer('selectedTickId')
    .toReducer(defaultState);