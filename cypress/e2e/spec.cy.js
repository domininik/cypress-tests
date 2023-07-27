describe('API spec', () => {
  describe('POST /', () => {
    it('responds succesfully', () => {
      cy.request('POST', '/', { 
        id: 0, 
        data: { from: 'ETH', to: 'USD' }
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })

    it('responds with correct data', () => {
      cy.request('POST', '/', { 
        id: 123, 
        data: { from: 'ETH', to: 'USD' }
      }).then((response) => {
        // return cy.task('log', response.body)

        expect(response.body).to.have.property('jobRunID', 123)
        expect(response.body).to.have.property('data')
        expect(response.body.data.USD).to.be.greaterThan(0)
        expect(response.body.data.result).to.be.greaterThan(0)
        expect(response.body.statusCode).to.eq(200)
      })
    })

    context('job id not supplied', () => {
      it('responds with correct data', () => {
        cy.request('POST', '/', { 
          data: { from: 'ETH', to: 'USD' }
        }).then((response) => {
          expect(response.body.jobRunID).to.eq('1')
        })
      })
    })

    context('base and quote in params', () => {
      it('responds with correct data', () => {
        cy.request('POST', '/', { 
          data: { base: 'ETH', quote: 'USD' }
        }).then((response) => {
          expect(response.body.data.USD).to.be.greaterThan(0)
          expect(response.body.data.result).to.be.greaterThan(0)
        })
      })
    })

    context('coin and market in params', () => {
      it('responds with correct data', () => {
        cy.request('POST', '/', { 
          data: { coin: 'ETH', market: 'USD' }
        }).then((response) => {
          expect(response.body.data.USD).to.be.greaterThan(0)
          expect(response.body.data.result).to.be.greaterThan(0)
        })
      })
    })

    context('from param not supplied', () => {
      it('responds with error', () => {
        cy.request({
          method: 'POST',
          url: '/',
          failOnStatusCode: false,
          body: { data: { to: 'USD' } }
        }).then((response) => {
          expect(response.status).to.eq(500)
          expect(response.body.error.error.message.error.message).to.eq('Required parameter not supplied: base')
        })
      })
    })

    context('to param not supplied', () => {
      it('responds with error', () => {
        cy.request({
          method: 'POST',
          url: '/',
          failOnStatusCode: false,
          body: { data: { from: 'ETH' } }
        }).then((response) => {
          expect(response.status).to.eq(500)
          expect(response.body.error.error.message.error.message).to.eq('Required parameter not supplied: quote')
        })
      })
    })

    context('base param not supplied', () => {
      it('responds with error', () => {
        cy.request({
          method: 'POST',
          url: '/',
          failOnStatusCode: false,
          body: { data: { quote: 'USD' } }
        }).then((response) => {
          expect(response.status).to.eq(500)
          expect(response.body.error.error.message.error.message).to.eq('Required parameter not supplied: base')
        })
      })
    })

    context('quote param not supplied', () => {
      it('responds with error', () => {
        cy.request({
          method: 'POST',
          url: '/',
          failOnStatusCode: false,
          body: { data: { base: 'ETH' } }
        }).then((response) => {
          expect(response.status).to.eq(500)
          expect(response.body.error.error.message.error.message).to.eq('Required parameter not supplied: quote')
        })
      })
    })

    context('coin param not supplied', () => {
      it('responds with error', () => {
        cy.request({
          method: 'POST',
          url: '/',
          failOnStatusCode: false,
          body: { data: { market: 'USD' } }
        }).then((response) => {
          expect(response.status).to.eq(500)
          expect(response.body.error.error.message.error.message).to.eq('Required parameter not supplied: base')
        })
      })
    })

    context('market param not supplied', () => {
      it('responds with error', () => {
        cy.request({
          method: 'POST',
          url: '/',
          failOnStatusCode: false,
          body: { data: { coin: 'ETH' } }
        }).then((response) => {
          expect(response.status).to.eq(500)
          expect(response.body.error.error.message.error.message).to.eq('Required parameter not supplied: quote')
        })
      })
    })

    context('empty params', () => {
      it('responds with error', () => {
        cy.request({
          method: 'POST',
          url: '/',
          failOnStatusCode: false,
          body: { data: {} }
        }).then((response) => {
          expect(response.status).to.eq(500)
          expect(response.body.error.error.message.error.message).to.eq('Required parameter not supplied: base')
        })
      })
    })
  })
})
