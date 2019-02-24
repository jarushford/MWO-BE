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
    it('GET all tour_dates', done => {
      chai.request(server)
        .get('/api/v1/tour_dates')
        .end((err, response) => {
          response.should.have.status(200)
          response.should.be.json
          response.body.should.be.a('array')
          
          done()
        })
    })
  })

})