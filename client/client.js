const publicVapidKey = 'BD0KRjdMBYG--Ci7sxi9vBOGIv-tzj9eYGPGrCUwEN0skEMvVJmIw5ZZdcym_wFkcbEOO6t3jFb277J86JXupYs'

// check for service worker
if ('serviceWorker' in navigator) {
    send().catch(err => console.error(err))
}

// register SW, register push, send push
async function send() {
    console.log('Registering SW...')
    let register = await navigator.serviceWorker.register('/worker.js', {
        scope: '/'
    })

    console.log('Service worker registered')

    // register push
    console.log('Registering push...')
    let subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
    })
    console.log('push registered')

    // send push notification
    console.log('Sending push notification...')
    await fetch('/subscribe', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            'content-type': 'application/json'
        }
    })
    console.log('push sent')

}

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}