describe('API spec', () => {
  context('POST /', function () {
    it('responds succesfully', function () {
      cy.request({
        method: 'POST', 
        url: '/', 
        body: { 
          id: 0, 
          data: { from: 'ETH', to: 'USD' } 
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('responds with correct data', function () {
      cy.request({
        method: 'POST', 
        url: '/', 
        body: { 
          id: 123, 
          data: { from: 'ETH', to: 'USD' } 
        },
      }).then((response) => {
        // return cy.task('log', response.body)

        expect(response.body).to.have.property('jobRunID', 123)
        expect(response.body).to.have.property('data')
        expect(response.body.data.USD).to.be.greaterThan(0)
        expect(response.body.data.result).to.be.greaterThan(0)
        expect(response.body.statusCode).to.eq(200)
      })
    })

    context('job id not supplied', function () {
      it('responds with correct data', function () {
        cy.request({
          method: 'POST', 
          url: 'http://localhost:8080/', 
          body: { 
            data: { from: 'ETH', to: 'USD' } 
          },
        }).then((response) => {
          expect(response.body.jobRunID).to.eq('1')
        })
      })
    })
  })
})
