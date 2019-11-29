import {ReducerCreator} from "redux-solid";
import defaultState from "./defaultState";

export const tasksReducer = new ReducerCreator()
    .withDictionaryReducer('tasks', 'id', {
        recreateDictionaryOnObjectChange: false,
        isArrayDictionary: true
    })
    .withDictionaryReducer('ticks', 'id', {
        recreateDictionaryOnObjectChange: false,
        isArrayDictionary: true
    })
    .withFlagReducer('tasks')
    .withFlagReducer('ticks')
    .toReducer(defaultState);