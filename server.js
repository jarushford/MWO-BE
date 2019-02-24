const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')


app.set('port', process.env.PORT || 3000)
app.locals.title = 'MWO'
app.use(cors())
app.use(bodyParser.json())

app.post('/api/v1/login', (request, response) => {
  const user = request.body.email
  const password = request.body.password

  database('users').where('email', user).select()
    .then(user => {
      if (!user.length) {
        response.status(401).json({ authorized: false })
      } else if (user[0].password === password) {
        response.status(200).json({ authorized: true })
      } else {
        response.status(401).json({ authorized: false })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/tour_dates', (request, response) => {
  database('tour_dates').select()
    .then(dates => {
      response.status(200).json(dates)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/news', (request, response) => {
  database('news').select()
    .then(items => {
      response.status(200).json(items)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/photos', (request, response) => {
  database('photos').select()
    .then(photos => {
      response.status(200).json(photos)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/videos', (request, response) => {
  database('videos').select()
    .then(videos => {
      response.status(200).json(videos)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.use((request, response) => {
  response.status(404).send('Page Not Found.')
})

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}`)
})

module.exports = app