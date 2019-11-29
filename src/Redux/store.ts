import {applyMiddleware, createStore} from "redux";
import ReduxLogger from "./Middlewares/ReduxLogger";
// @ts-ignore
import multi from "redux-multi";
import {reducers} from "./reducers";
import {ApplicationState} from "./models";

let reduxStore = (window as any).$store;
if (!reduxStore) {
    reduxStore = createStore<ApplicationState, any, any, any>(reducers, applyMiddleware(ReduxLogger, multi));

    (window as any).$s = () => reduxStore.getState();
    (window as any).$store = reduxStore;
}

export {reduxStore};