const alarmSound = require('./eventually.snd');
const alarmImage = require('./app.png');

interface NotificationInfo {
    id: number;
    title: string;
    description: string;
    remainingTime: number;
    type: 'warning' | 'info' | 'remove';
}

export const notificationActions = {
    async notify(notification: NotificationInfo) {

        new Audio(alarmSound).play();
        window.parent.postMessage({type: 'notify', content: notification}, '*');

        if (notification.type == 'remove')
            await removeNotification(notification);
        else await notifyTask(notification);
    },
};


const notificationTags = new Set<string>();

const checkPermissions = async () => {
    if (!navigator.permissions) return false;
    return (await self.navigator.permissions.query({name: "notifications"})).state == 'granted';
};

const notifyTask = async (notification: NotificationInfo) => {
    if (!await checkPermissions())
        return;

    const tag = notification.id.toString();

    if (!notificationTags.has(tag))
        notificationTags.add(tag);

    const registration = await navigator.serviceWorker.ready;
    await registration.showNotification(notification.title, {
        body: `${notification.description || ''}\n${notification.remainingTime}` + 'مدت تعویق m',
        dir: 'rtl',
        tag,
        vibrate: notification.type == 'warning' ? [200, 100, 50, 200, 100, 50, 200] : [],
        badge: alarmImage,
        icon: alarmImage,
        lang: 'fa',
        renotify: true
    });
};

const removeNotification = async (notification: NotificationInfo) => {
    const tag = notification.id.toString();

    if (!notificationTags.has(tag))
        return;

    notificationTags.delete(tag);
    const registration = await navigator.serviceWorker.ready;
    const notifications = await registration.getNotifications({tag});
    for (const n of notifications)
        n.close();
};