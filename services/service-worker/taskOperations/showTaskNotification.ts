import {TaskView} from "../../../utils/tasksUtils";

declare const self: ServiceWorkerGlobalScope;

export default async (taskView: TaskView, type: 'info' | 'warning') => {
    if (!await checkPermissions())
        return;

    await self.registration.showNotification('تیک تیک', {
        body: `${taskView.task.name}\n${taskView.task.description}\n${taskView.toleranceMinutes}` + 'مدت تعویق m',
        dir: 'rtl',
        tag: 'نام تسک',
        vibrate: type == 'warning' ? [200, 100, 50, 200, 100, 50, 200] : undefined,
        // badge: require(type == 'info' ? './images/clock.jpg' : './images/clock.jpg'),
        badge: require('./images/clock.svg'),
        renotify: true,
        actions
    });
}

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