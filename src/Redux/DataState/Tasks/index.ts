import {ReducerCreator} from "redux-solid";
import defaultState from "./defaultState";
import {getTickUniqueId, TickInfo} from "./Models/TickInfo";

const ticksReducerOnReducing = (e: any) => {
    let {data} = e.action;
    if (!data) return;

    data = Array.isArray(data) ? data : [data];
    
    data.forEach((d: TickInfo) => {
        d.forDate = d.forDate.split('T')[0];
        d._unique = getTickUniqueId(d);
    })
};

export const tasksReducer = new ReducerCreator()
    .withDictionaryReducer('tasks', 'id', {
        recreateDictionaryOnObjectChange: false,
        isArrayDictionary: true,
        cachingOptions: {
            cacheMethod: "localStorage"
        }
    })
    .withDictionaryReducer('ticks', '_unique', {
        recreateDictionaryOnObjectChange: false,
        isArrayDictionary: true,
        events: {
            onReducing: ticksReducerOnReducing
        },
        cachingOptions: {
            cacheMethod: "localStorage"
        }
    })
    .withFlagReducer('tasks')
    .withFlagReducer('ticks')
    .toReducer(defaultState);