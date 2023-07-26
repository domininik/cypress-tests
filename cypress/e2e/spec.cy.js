describe('API spec', () => {
  context('POST /', function () {
    it('responds succesfully', function () {
      cy.request({
        method: 'POST', 
        url: 'http://localhost:8080/', 
        body: { 
          id: 0, 
          data: { from: 'ETH', to: 'USD' } 
        },
      }).then((response) => {
        expect(response.status).to.eq(200)
      })
    })
  })
})
