import {ApplicationState} from "./models";
import {reduxStore} from "./store";


export const getState = (): ApplicationState => reduxStore.getState() as any;
export const dispatch = reduxStore.dispatch;
export default reduxStore;
export {ApplicationState}