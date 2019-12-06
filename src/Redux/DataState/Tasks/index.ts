import {ReducerCreator} from "redux-solid";
import defaultState from "./defaultState";
import {TickInfo} from "./Models/TickInfo";

const ticksReducerOnReducing = (e: any) => {
    let {data} = e.action;
    if (!data) return;
    data = Array.isArray(data) ? data : [data];
    data.forEach((d: TickInfo) => d.forDate = d.forDate.split('T')[0])
};

export const tasksReducer = new ReducerCreator()
    .withDictionaryReducer('tasks', 'id', {
        recreateDictionaryOnObjectChange: false,
        isArrayDictionary: true
    })
    .withDictionaryReducer('ticks', 'id', {
        recreateDictionaryOnObjectChange: false,
        isArrayDictionary: true,
        events: {
            onReducing: ticksReducerOnReducing
        }
    })
    .withFlagReducer('tasks')
    .withFlagReducer('ticks')
    .toReducer(defaultState);