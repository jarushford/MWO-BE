const { 
  users,
  tour_dates,
  news,
  photos,
  videos,
  contacts
} = require('../../../utils/mockData')

const insertUser = (knex, user) => {
  return knex('users').insert(user)
}

const insertDate = (knex, date) => {
  return knex('tour_dates').insert(date)
}

const insertNews = (knex, item) => {
  return knex('news').insert(item)
}

const insertPhoto = (knex, photo) => {
  return knex('photos').insert(photo)
}

const insertVideo = (knex, video) => {
  return knex('videos').insert(video)
}

const insertContact = (knex, contact) => {
  return knex('mailing').insert(contact)
}

exports.seed = function(knex, Promise) {
  return knex('users').del()
    .then(() => knex('tour_dates').del())
    .then(() => knex('news').del())
    .then(() => knex('photos').del())
    .then(() => knex('videos').del())
    .then(() => knex('mailing').del())
    .then(() => {
      let promises = []

      users.forEach(user => promises.push(insertUser(knex, user)))
      tour_dates.forEach(date => promises.push(insertDate(knex, date)))
      news.forEach(item => promises.push(insertNews(knex, item)))
      photos.forEach(photo => promises.push(insertPhoto(knex, photo)))
      videos.forEach(video => promises.push(insertVideo(knex, video)))
      contacts.forEach(contact => promises.push(insertContact(knex, contact)))


      return Promise.all(promises)
    })
    .catch(error => console.log(`Error seeding data: ${error}`))
}
