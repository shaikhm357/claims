const sa = require('supertest')
const { assert } = require('chai')
const request = sa('http://localhost:3004')

describe('claim term tests', function () {
  describe('GET Term Schema', function () {
    it('test /claim/term/getClaimSchema ', (done) => {
      request
        .get('/claim/term/getClaimSchema')
        .expect(200)
        .expect((res) => {
            console.log(JSON.stringify(res.body, null, 2))
          assert.isObject(res.body, 'expected response is object')
          assert.isNotEmpty(res.body, 'expected response is not empty')
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          done()
        })
    })
  })

  describe('GET pincode', function () {
    it('test /pincode/400017', (done) => {
      request
        .get('/pincode/400017')
        .expect(200)
        .expect((res) => {
          //   console.log(JSON.stringify(res.body, null, 2))
          assert.isObject(res.body, 'expected response is object')
          assert.isNotEmpty(res.body, 'expected response is not empty')
        })
        .end((err, res) => {
          if (err) {
            return done(err)
          }
          done()
        })
    })
  })
})
