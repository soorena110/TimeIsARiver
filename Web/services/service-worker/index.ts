import {getResponseFromCacheOrFetch} from "./requestUtils";

declare const self: ServiceWorkerGlobalScope;

self.addEventListener('install', (e: any) => {
});
self.addEventListener('activate', (e: any) => {
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

