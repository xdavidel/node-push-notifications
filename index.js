const express = require('express')
const webPush = require('web-push')
const bodyParser = require('body-parser')
const path = require('path')

const app = express()

app.use(express.static(path.join(__dirname, 'client')))

app.use(bodyParser.json())

const publicVapidKey = 'BD0KRjdMBYG--Ci7sxi9vBOGIv-tzj9eYGPGrCUwEN0skEMvVJmIw5ZZdcym_wFkcbEOO6t3jFb277J86JXupYs'

const privateVapidKey = 'BGbgwgEEUSoJwttzVGrKqbW2mYrycqzYL-8havncOLk'

webPush.setVapidDetails('mailto:test@test.com', publicVapidKey, privateVapidKey)

// subscribe route
app.post('/subscribe', (req, res) => {
    // get push subscription object
    const subscription = req.body

    // send 201 - resource created
    res.status(201).json({})

    // create payload
    const payload = JSON.stringify({ title: 'Push Test' })

    // pass object into send notification action
    webPush.sendNotification(subscription, payload)
        .catch(err => console.error(err))
})

const port = process.env.PORT | 5500
app.listen(port, () => console.log(`Server started on port ${port}`))