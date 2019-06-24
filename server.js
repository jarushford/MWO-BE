const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)
const bodyParser = require('body-parser')
const express = require('express')
const app = express()
const cors = require('cors')
const { 
  validateTourDateParams,
  validateNewsParams,
  validatePhotoParams,
  validateVideoParams
} = require('./utils/middleware')


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

app.post('/api/v1/tour_dates', validateTourDateParams, (request, response) => {
  const newDate = {
    day_of_week: request.body.day_of_week,
    date: request.body.date,
    city: request.body.city,
    venue: request.body.venue,
    ticket_link: request.body.ticket_link,
    venue_link: request.body.venue_link
  }

  database('tour_dates').insert(newDate, 'id')
    .then(dateID => {
      response.status(201).json({ id: dateID[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/tour_dates/:id', (request, response) => {
  const id = request.params.id
  database('tour_dates').where('id', id).del()
    .then(dateID => {
      if (dateID > 0) {
        response.status(200)
      } else {
        response.status(404).json({ message: 'Could not find that date.' })
      }
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

app.post('/api/v1/news', validateNewsParams, (request, response) => {
  const newItem = {
    title: request.body.title,
    body: request.body.body,
    link: request.body.link,
    image_url: request.body.image_url
  }

  database('news').insert(newItem, 'id')
    .then(newsID => {
      response.status(201).json({ id: newsID[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/news/:id', (request, response) => {
  const id = request.params.id
  database('news').where('id', id).del()
    .then(itemID => {
      if (itemID) {
        response.status(200)
      } else {
        response.status(404).json({ message: 'Could not find that item.' })
      }
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

app.post('/api/v1/photos', validatePhotoParams, (request, response) => {
  const newPhoto = {
    description: request.body.description,
    link: request.body.link
  }

  database('photos').insert(newPhoto, 'id')
    .then(photoID => {
      response.status(201).json({ id: photoID[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/photos/:id', (request, response) => {
  const id = request.params.id
  database('photos').where('id', id).del()
    .then(photoID => {
      if (photoID) {
        response.status(200)
      } else {
        response.status(404).json({ message: 'Could not find that photo.' })
      }
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

app.post('/api/v1/videos', validateVideoParams, (request, response) => {
  const newVideo = {
    title: request.body.title,
    link: request.body.link
  }

  database('videos').insert(newVideo, 'id')
    .then(videoID => {
      response.status(201).json({ id: videoID[0] })
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.delete('/api/v1/videos/:id', (request, response) => {
  const id = request.params.id
  database('videos').where('id', id).del()
    .then(videoID => {
      if (videoID) {
        response.status(200)
      } else {
        response.status(404).json({ message: 'Could not find that video.' })
      }
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.get('/api/v1/mailing', (request, response) => {
  database('mailing').select()
    .then(emails => {
      response.status(200).json(emails)
    })
    .catch(error => {
      response.status(500).json({ error })
    })
})

app.post('api/v1/mailing', (request, response) => {
  const subscriber = {
    email: request.body.email
  }

  database('mailing').insert(subscriber, 'id')
    .then(subID => {
      response.status(201).json({ id: subID[0] })
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