import {getResponseFromCacheOrFetch} from "./requestUtils";

self.addEventListener('install', (e: any) => {
});

self.addEventListener('activate', (e: any) => {
});

self.addEventListener('fetch', (e: FetchEvent) => {
    e.respondWith(
        getResponseFromCacheOrFetch(e.request)
    );
});

// self.addEventListener('')