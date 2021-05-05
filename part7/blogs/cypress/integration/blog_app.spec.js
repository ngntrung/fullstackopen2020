describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const userObject = {
      username: 'ron',
      password: 'password',
      name: 'Ron Wesley'
    }
    const userObject2 = {
      username: 'harry',
      password: 'password',
      name: 'Harry Potter'
    }
    cy.request('POST', 'http://localhost:3003/api/users', userObject)
    cy.request('POST', 'http://localhost:3003/api/users', userObject2)
    cy.visit('http://localhost:3000')
  })
  it('Login form is shown', function() {
    cy.contains('Log in to application')
  })

  describe('Login', function() {
    beforeEach(function() {
      cy.visit('http://localhost:3000')
      cy.contains('login').click()
      cy.get('#username').type('ron')
    })
    it('succeeds with correct credentials', function() {
      cy.get('#password').type('password')
      cy.get('#loginButton').click()
      cy.contains('logged in')
    })
    it('fails with wrong credentials', function() {
      cy.get('#password').type('nopassword')
      cy.get('#loginButton').click()
      cy.contains('Wrong Credentials')
    })
  })
  
  describe('When logged in', function() {
    beforeEach(function() {
      cy.login({ username: 'ron', password: 'password'})
    })
    it('A blog can be created', function() {
      cy.contains('new blog').click()
      cy.get('#blogTitle').type('A blog test')
      cy.get('#blogAuthor').type('Trung')
      cy.get('#blogUrl').type('http://google.com')
      cy.contains('Save').click()

      cy.contains('A blog test')
    })

    it('User can like a blog', function() {
      cy.contains('new blog').click()
      cy.get('#blogTitle').type('A blog test')
      cy.get('#blogAuthor').type('Trung')
      cy.get('#blogUrl').type('http://google.com')
      cy.contains('Save').click()
      cy.contains('view').click()
      cy.get('.likeBtn').click()
      cy.contains('likes 1')
    })

    describe('When a blog created', function() {
      beforeEach(function() {
        cy.login({ username: 'ron', password: 'password'})
        cy.contains('new blog').click()
        cy.get('#blogTitle').type('A blog test')
        cy.get('#blogAuthor').type('Trung')
        cy.get('#blogUrl').type('http://google.com')
        cy.contains('Save').click()
      })

      it('User can delete a blog', function() {
        cy.contains('view').click()
        cy.get('#removeBtn').click()
        cy.get('html').should('not.contain', 'A blog test Trung')
      })
      it("User can't delete a blog", function() {
        cy.contains('Logout').click()
        cy.login({ username: 'harry', password: 'password' })
        cy.contains('view').click()
        cy.get('html').should('not.contain', '#removeBtn')
      })
    })

    describe.only('blog ordering', function() {
      beforeEach(function() {
        cy.login({ username: 'ron', password: 'password' })

        cy.create({ title: 'Blog test 1', author: 'Trung', url:'http://google.com'}).wait(500)
        cy.create({ title: 'Blog test 2', author: 'Trung', url:'http://google.com'}).wait(500)
        cy.create({ title: 'Blog test 3', author: 'Trung', url:'http://google.com'}).wait(500)
        cy.create({ title: 'Blog test 4', author: 'Trung', url:'http://google.com'}).wait(500)
      })

      it('blogs in correct orders', function() {
        const { _, $ } = Cypress
        cy.get('.blogItem')
            cy.get('.toggleView').click({multiple: true})

        cy.contains('Blog test 1 Trung').parent().find('.likeBtn').as('theButton1')
        cy.contains('Blog test 2 Trung').parent().find('.likeBtn').as('theButton2')
        cy.contains('Blog test 3 Trung').parent().find('.likeBtn').as('theButton3')
        _.times(5, () => cy.get('@theButton1').click().wait(300))
        _.times(4, () => cy.get('@theButton2').click().wait(300))
        _.times(10, () => cy.get('@theButton3').click().wait(300))

        cy.get('.overview')
          .then($items => { return $items.map((index, html) => Cypress.$(html).text()).get() })
          .should('deep.eq', ['Blog test 3 Trung hide', 'Blog test 1 Trung hide', 'Blog test 2 Trung hide', 'Blog test 4 Trung hide'])
        
        })
    })
  })
})
