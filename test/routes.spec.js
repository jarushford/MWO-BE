const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server')

const environment = process.env.NODE_ENV || 'development'
const config = require('../knexfile')[environment]
const knex = require('knex')(config)

chai.use(chaiHttp)

describe('API', () => {
  before(done => {
    knex.migrate.latest()
      .then(() => {
        done()
      })
  })

  beforeEach(done => {
    knex.seed.run()
      .then(() => {
        done()
      })
  })

  describe('/api/v1/tour_dates', () => {
    it.skip('GET all tour_dates', done => {
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
  })
})