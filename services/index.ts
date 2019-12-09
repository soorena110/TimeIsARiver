if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/service-worker.js')
        // .then(registeration => console.log('registerd', registeration))
        // .catch(error => console.error('not registerd', error));

}

(module as any).hot.accept('./index.ts');