import {checkerActions} from "./checkerActions";
import {notificationActions} from "./notificationActions";

export const backgroundService = {
    ...checkerActions,
    ...notificationActions
};