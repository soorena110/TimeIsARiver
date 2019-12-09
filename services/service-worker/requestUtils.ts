const cacheKey = 'timeRiver';
const cacheablesMethods = ['GET', 'OPTIONS'];

export const getResponseFromCacheOrFetch = async (request: Request) => {
    if (!cacheablesMethods.includes(request.method) ||
        request.url.includes('sockjs-node') ||
        request.url.includes('chrome-extension'))
        return fetch(request);

    if (request.headers.get('cache-control') !== 'no-cache')
        return getCacheFirstResponse(request);
    return getFetchFirstResponse(request)
};

const getFetchFirstResponse = async (request: Request) => {
    try {
        const networkResponse = await fetch(request);
        if (cacheablesMethods.includes(request.method)) {
            const cache = await caches.open(cacheKey);
            await cache.put(request, networkResponse.clone());
        }
        return networkResponse
    } catch (e) {
        const cacheResponse = await caches.match(request);
        if (cacheResponse)
            return cacheResponse;
        throw 'cache is empty !! :|'
    }
};

const getCacheFirstResponse = async (request: Request) => {
    const cachedResponse = await caches.match(request);
    if (cachedResponse)
        return cachedResponse;

    const networkResponse = await fetch(request);
    const cache = await caches.open(cacheKey);
    await cache.put(request, networkResponse.clone());

    return networkResponse;
};