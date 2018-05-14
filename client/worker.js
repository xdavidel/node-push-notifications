console.log('Service worker loaded')

self.addEventListener('push', e => {
    const data = e.data.json()
    console.log('push received')

    self.registration.showNotification(data.title, {
        body: 'Notified by xdavidel',
        icon: 'http://image.ibb.co/frYOFd/tmlogo.png'

    })
})