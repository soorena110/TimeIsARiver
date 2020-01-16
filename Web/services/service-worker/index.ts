import {getResponseFromCacheOrFetch} from "./requestUtils";
import fetchTasksAndTicksFromServer from "./taskOperations/fetchTasksAndTicksFromServer";
import getWarningTasks from "./taskOperations/getWarningTasks";
import showTaskNotification from "./taskOperations/showTasksNotification";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (e: any) => {
});
self.addEventListener('activate', (e: any) => {
    const checkNotificationStatus = async () => {
        await fetchTasksAndTicksFromServer();
        const taskViews = await getWarningTasks();
        await showTaskNotification(taskViews);
    };

    setInterval(checkNotificationStatus, 60000);
    checkNotificationStatus().catch(e => console.error(e));
});

self.addEventListener('fetch', (e: FetchEvent) => {
    e.respondWith(
        getResponseFromCacheOrFetch(e.request)
    );
});

self.addEventListener('sync', (e: SyncEvent) => {

});

self.addEventListener('notificationclick', (e: NotificationEvent) => {
    e.notification.close();
    if (!e.action) self.clients.openWindow('/')
});

