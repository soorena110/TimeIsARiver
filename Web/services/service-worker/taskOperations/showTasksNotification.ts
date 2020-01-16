import {TaskView} from "../../../utils/tasksUtils";
import {TickType} from "../../../src/Redux/DataState/Tasks/Models/TickInfo";

declare const self: ServiceWorkerGlobalScope;

const notificationTags = new Set<string>();

export default async (taskViews: TaskView[]) => {
    for (const tv of taskViews) {
        const isTodo = !tv.tick || tv.tick.type == TickType.todo;

        if (isTodo && tv.toleranceMinutes == 15)
            await notifyTask(tv, 'info');
        else if (isTodo && tv.toleranceMinutes <= 0)
            await notifyTask(tv, 'warning');
        else await removeNotification(tv)
    }
}

const removeNotification = async (taskView: TaskView) => {
    const tag = taskView.task.id.toString();

    if (!notificationTags.has(tag))
        return;

    notificationTags.delete(tag);
    const notifications = await self.registration.getNotifications({tag});
    for (const n of notifications)
        n.close();
};

const notifyTask = async (taskView: TaskView, type: 'info' | 'warning') => {
    if (!await checkPermissions())
        return;

    const tag = taskView.task.id.toString();

    if (!notificationTags.has(tag))
        notificationTags.add(tag);

    await self.registration.showNotification('تیک تیک', {
        body: `${taskView.task.name}\n${taskView.task.description}\n${taskView.toleranceMinutes}` + 'مدت تعویق m',
        dir: 'rtl',
        tag,
        vibrate: type == 'warning' ? [200, 100, 50, 200, 100, 50, 200] : undefined,
        badge: require('./images/clock.svg'),
        icon: require('./images/clock.png'),
        lang: 'fa',
        renotify: true,
        actions
    });
};

const checkPermissions = async () => {
    if (!navigator.permissions) return false;
    return (await self.navigator.permissions.query({name: "notifications"})).state == 'granted';
};

const actions = [
    {
        title: 'درحال انجام',
        action: 'tick-doing'
    },
    {
        title: 'انجام شد',
        action: 'tick-done'
    }
];