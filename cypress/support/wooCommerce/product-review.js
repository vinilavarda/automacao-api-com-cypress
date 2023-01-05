/// <reference types="cypress"/>

Cypress.Commands.add(
  'postProductReviewWooCommercer',
  function (token, product_id, review, reviewer, reviewer_email, rating) {
    cy.request({
      method: 'POST',
      url: Cypress.config('baseUrl') + '/products/reviews',
      headers: {
        Authorization: token
      },
      body: {
        product_id: product_id,
        review: review,
        reviewer: reviewer,
        reviewer_email: reviewer_email,
        rating: rating
      }
    })
  }
)

Cypress.Commands.add(
  'putProductReviewWooCommercer',
  function (token, product_id, review, reviewer, reviewer_email, rating, id) {
    cy.request({
      method: 'PUT',
      url: Cypress.config('baseUrl') + '/products/reviews' + '/' + id,
      headers: {
        Authorization: token
      },
      body: {
        product_id: product_id,
        review: review,
        reviewer: reviewer,
        reviewer_email: reviewer_email,
        rating: rating
      }
    })
  }
)

Cypress.Commands.add(
  'deleteProductReviewWooCommercer',
  function (token, id, force) {
    cy.request({
      method: 'DELETE',
      url:
        Cypress.config('baseUrl') +
        '/products/reviews' +
        '/' +
        id +
        '?force=' +
        force,
      headers: {
        Authorization: token
      }
    })
  }
)
