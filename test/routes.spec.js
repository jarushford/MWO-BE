const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const knex = require('knex')(config)

chai.use(chaiHttp)

describe('API', () => {
  
  beforeEach(done => {
    knex.migrate.latest()
      .then(() => knex.seed.run())
      .then(() => done())
  })

  describe('/api/v1/login', () => {
    it('POST correct login info', done => {
      chai.request(server)
        .post('/api/v1/login')
        .send({
          "email": "madwallaceband@gmail.com",
          "password": "94d7d6e119293a25462d2e84414715de7bddb051cddc033318e00598540a8cff"
        })
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.have.property('authorized')
          response.body.authorized.should.be.a('boolean')
          response.body.authorized.should.equal(true)
          done()
        })
    })

    it('POST incorrect login info', done => {
      chai.request(server)
        .post('/api/v1/login')
        .send({
          "email": "madwallaceband@gmail.com",
          "password": "94d7d6e119293a62d2e847bddb051cddc033318e00598540a8cff"
        })
        .end((err, response) => {
          response.should.have.status(401)
          response.should.be.json
          response.body.should.have.property('authorized')
          response.body.authorized.should.be.a('boolean')
          response.body.authorized.should.equal(false)
          done()
        })
    })

    it('POST login info for a user that does not exist', done => {
      chai.request(server)
        .post('/api/v1/login')
        .send({
          "email": "john@gmail.com",
          "password": "94d7d6e119293a62d2e847bddb051cddc033318e00598540a8cff"
        })
        .end((err, response) => {
          response.should.have.status(401)
          response.should.be.json
          response.body.should.have.property('authorized')
          response.body.authorized.should.be.a('boolean')
          response.body.authorized.should.equal(false)
          done()
        })
    })
  })

  describe('/api/v1/tour_dates', () => {
    it('GET all tour_dates', done => {
      chai.request(server)
        .get('/api/v1/tour_dates')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.should.have.length(2)
          response.body[0].should.have.property('day_of_week')
          response.body[0].day_of_week.should.be.a('string')
          response.body[0].should.have.property('date')
          response.body[0].date.should.be.a('string')
          response.body[0].should.have.property('city')
          response.body[0].city.should.be.a('string')
          response.body[0].should.have.property('venue')
          response.body[0].venue.should.be.a('string')
          response.body[0].should.have.property('ticket_link')
          response.body[0].ticket_link.should.be.a('string')
          response.body[0].should.have.property('venue_link')
          response.body[0].venue_link.should.be.a('string')
          done()
        })
    })

    it('POST new tour date successfully', done => {
      chai.request(server)
        .post('/api/v1/tour_dates')
        .send({
          "day_of_week": "Friday",
          "date": "06/13",
          "city": "Denver, CO",
          "venue": "Red Rocks",
          "ticket_link": "https://www.redrocks.com/",
          "venue_link": "https://www.redrocks.com/"
        })
        .end((err, response) => {
          response.should.have.status(201)
          response.should.be.json
          response.body.should.have.property('id')
          response.body.id.should.be.a('number')
          done()
        })
    })

    it('POST new tour date incorrectly', done => {
      chai.request(server)
        .post('/api/v1/tour_dates')
        .send({
          "day_of_week": "Friday",
          "date": "06/13",
          "city": "Denver, CO",
          "ticket_link": "https://www.redrocks.com/",
          "venue_link": "https://www.redrocks.com/"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.should.be.json
          response.body.should.have.property('message')
          response.body.message.should.be.a('string')
          response.body.message.should.equal('Expected format: { day_of_week: <String>, date: <String>, city: <String>, venue: <String>, ticket_link: <String>, venue_link: <String> }. You are missing a venue.')
          done()
        })
    })
  })

  describe('/api/v1/news', () => {
    it('GET all news items', done => {
      chai.request(server)
        .get('/api/v1/news')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.should.have.length(1)
          response.body[0].should.have.property('title')
          response.body[0].title.should.be.a('string')
          response.body[0].should.have.property('body')
          response.body[0].body.should.be.a('string')
          response.body[0].should.have.property('link')
          response.body[0].link.should.be.a('string')
          response.body[0].should.have.property('image_url')
          response.body[0].image_url.should.be.a('string')
          done()
        })
    })

    it('POST a news item successfully', done => {
      chai.request(server)
        .post('/api/v1/news')
        .send({
          "title": "New things!",
          "body": "Come check out the new things!",
          "link": "https://www.newstuff.com",
          "image_url": "https://www.newstuff.jpg"
        })
        .end((err, response) => {
          response.should.have.status(201)
          response.should.be.json
          response.body.should.have.property('id')
          response.body.id.should.be.a('number')
          done()
        })
    })

    it('POST a news item incorrectly', done => {
      chai.request(server)
        .post('/api/v1/news')
        .send({
          "title": "New things!",
          "body": "Come check out the new things!",
          "link": "https://www.newstuff.com"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.should.be.json
          response.body.should.have.property('message')
          response.body.message.should.be.a('string')
          response.body.message.should.equal('Expected format: { title: <String>, body: <String>, link: <String>, image_url: <String> }. You are missing a image_url.')
          done()
        })
    })
  })

  describe('/api/v1/photos', () => {
    it('GET all photos', done => {
      chai.request(server)
        .get('/api/v1/photos')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.should.have.length(1)
          response.body[0].should.have.property('link')
          response.body[0].link.should.be.a('string')
          response.body[0].should.have.property('description')
          response.body[0].description.should.be.a('string')
          done()
        })
    })

    it('POST a photo successfully', done => {
      chai.request(server)
        .post('/api/v1/photos')
        .send({
          "description": "nice photo",
          "link": "https://www.newstuff.com/image.jpg"
        })
        .end((err, response) => {
          response.should.have.status(201)
          response.should.be.json
          response.body.should.have.property('id')
          response.body.id.should.be.a('number')
          done()
        })
    })

    it('POST a photo incorrectly', done => {
      chai.request(server)
        .post('/api/v1/photos')
        .send({
          "description": "nice photo"
        })
        .end((err, response) => {
          response.should.have.status(422)
          response.should.be.json
          response.body.should.have.property('message')
          response.body.message.should.be.a('string')
          response.body.message.should.equal('Expected format: { link: <String>, description: <String> }. You are missing a link.')
          done()
        })
    })
  })

  describe('/api/v1/videos', () => {
    it('GET all videos', done => {
      chai.request(server)
        .get('/api/v1/videos')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          response.body.should.have.length(1)
          response.body[0].should.have.property('title')
          response.body[0].title.should.be.a('string')
          response.body[0].should.have.property('link')
          response.body[0].link.should.be.a('string')
          done()
        })
    })
  })

})