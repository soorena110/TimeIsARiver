import {getState} from "../../Redux";
import {getDateFromDateTime} from "../../../utils/dateTimeUtils";
import computeTaskOfDate from "../../../utils/tasksUtils";
import {TickType} from "../../Redux/DataState/Tasks/Models/TickInfo";
import Services from "../index";

export const checkerActions = {
    startCheckingTasksNotification() {
        setInterval(checkWarningTasksAndNotify, 60000);
        setTimeout(checkWarningTasksAndNotify, 10000);
    },
};

const checkWarningTasksAndNotify = () => {
    const notifications = getWarningTasks();


    notifications.forEach(taskView => {
            const isTodo = !taskView.tick || taskView.tick.type == TickType.todo;

            const type = isTodo && taskView.toleranceMinutes == 15 ? 'info' :
                isTodo && taskView.toleranceMinutes <= 0 ? 'warning' : 'remove';

            Services.backgroundService.notify({
                id: taskView.task.id,
                title: taskView.task.name,
                description: taskView.task.description,
                remainingTime: taskView.toleranceMinutes,
                type
            });
        }
    );
};

const getWarningTasks = () => {
    const tasks = Object.values(getState().tasks.tasks || {});
    const ticks = Object.values(getState().tasks.ticks || {});

    const currentDayStart = getDateFromDateTime(new Date());
    const taskViews = computeTaskOfDate(tasks, ticks, currentDayStart, new Date(currentDayStart.valueOf() + 24 * 3600 * 1000));

    return taskViews.filter(tv => {
        if (tv.tick && tv.tick?.type != TickType.todo)
            return false;
        return tv.toleranceMinutes <= 15;
    });
};