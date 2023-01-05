import tokenFixture from '../../fixtures/token.json'
import productReviewFixture from '../../fixtures/product-reviews.json'
import statusFixture from '../../fixtures/status.json'
import { faker } from '@faker-js/faker'
import productReviewSchemaPost from '../../contratos/product-reviews-post'
import productReviewSchemaDelete from '../../contratos/product-reviews-delete'
import productReviewSchemaPut from '../../contratos/product-reviews-put'

describe('Product Review', () => {
  // Cenário de criação de um Product Review - Aceitação através do POST

  it('Creating Product Review - Aceitação', () => {
    const review = faker.lorem.paragraph()
    cy.postProductReviewWooCommercer(
      tokenFixture.token,
      productReviewFixture.dadosValidos.product_id,
      review,
      productReviewFixture.dadosValidos.reviewer,
      productReviewFixture.dadosValidos.reviewer_email,
      productReviewFixture.dadosValidos.rating
    ).then(response => {
      const id = response.body.id
      expect(response.status).to.be.eq(statusFixture.created)
      expect(response.body.product_id).to.be.eq(
        productReviewFixture.dadosValidos.product_id
      )
      expect(response.body.review).to.be.eq(review)
      expect(response.body.reviewer).to.be.eq(
        productReviewFixture.dadosValidos.reviewer
      )
      expect(response.body.reviewer_email).to.be.eq(
        productReviewFixture.dadosValidos.reviewer_email
      )
      expect(response.body.rating).to.be.eq(
        productReviewFixture.dadosValidos.rating
      )
      cy.deleteProductReviewWooCommercer(
        tokenFixture.token,
        id,
        productReviewFixture.dadosDeletar.force
      )
    })
  })

  // Cenário de criação de um Product Review - Contrato

  it('Creating Product Review - Contrato', () => {
    const review = faker.lorem.paragraph()
    cy.postProductReviewWooCommercer(
      tokenFixture.token,
      productReviewFixture.dadosValidos.product_id,
      review,
      productReviewFixture.dadosValidos.reviewer,
      productReviewFixture.dadosValidos.reviewer_email,
      productReviewFixture.dadosValidos.rating
    ).then(response => {
      cy.validarContrato(productReviewSchemaPost, response.body)
      const id = response.body.id
      cy.deleteProductReviewWooCommercer(
        tokenFixture.token,
        id,
        productReviewFixture.dadosDeletar.force
      )
    })
  })

  // Cenário de Update de um Product Review - Aceitação utilizando PUT

  it('Updating Product Review - Aceitação', () => {
    const review = faker.lorem.paragraph()
    cy.postProductReviewWooCommercer(
      tokenFixture.token,
      productReviewFixture.dadosValidos.product_id,
      review,
      productReviewFixture.dadosValidos.reviewer,
      productReviewFixture.dadosValidos.reviewer_email,
      productReviewFixture.dadosValidos.rating
    ).then(response => {
      const id = response.body.id
      const reviewEdit = faker.lorem.paragraph()
      cy.putProductReviewWooCommercer(
        tokenFixture.token,
        productReviewFixture.dadosEditados.product_id,
        reviewEdit,
        productReviewFixture.dadosEditados.reviewer,
        productReviewFixture.dadosEditados.reviewer_email,
        productReviewFixture.dadosEditados.rating,
        id
      ).then(response => {
        expect(response.status).to.eq(statusFixture.ok)
        expect(response.body.product_id).to.be.eq(
          productReviewFixture.dadosEditados.product_id
        )
        expect(response.body.review).to.be.eq(reviewEdit)
        expect(response.body.reviewer).to.be.eq(
          productReviewFixture.dadosEditados.reviewer
        )
        expect(response.body.reviewer_email).to.be.eq(
          productReviewFixture.dadosEditados.reviewer_email
        )
        expect(response.body.rating).to.be.eq(
          productReviewFixture.dadosEditados.rating
        )
        cy.deleteProductReviewWooCommercer(
          tokenFixture.token,
          id,
          productReviewFixture.dadosDeletar.force
        )
      })
    })
  })

  // Cenário de Update de um Product Review - Contrato

  it('Updating Product Review - Contrato', () => {
    const review = faker.lorem.paragraph()
    cy.postProductReviewWooCommercer(
      tokenFixture.token,
      productReviewFixture.dadosValidos.product_id,
      review,
      productReviewFixture.dadosValidos.reviewer,
      productReviewFixture.dadosValidos.reviewer_email,
      productReviewFixture.dadosValidos.rating
    ).then(response => {
      const id = response.body.id
      const reviewEdit = faker.lorem.paragraph()
      cy.putProductReviewWooCommercer(
        tokenFixture.token,
        productReviewFixture.dadosEditados.product_id,
        reviewEdit,
        productReviewFixture.dadosEditados.reviewer,
        productReviewFixture.dadosEditados.reviewer_email,
        productReviewFixture.dadosEditados.rating,
        id
      ).then(() => {
        cy.validarContrato(productReviewSchemaPut, response.body)
        const id = response.body.id
        cy.deleteProductReviewWooCommercer(
          tokenFixture.token,
          id,
          productReviewFixture.dadosDeletar.force
        )
      })
    })
  })

  // Cenário de Delete a Product Review - Aceitação utilizando DELETE

  it('Deleting Product Review - Aceitação', () => {
    const review = faker.lorem.paragraph()
    cy.postProductReviewWooCommercer(
      tokenFixture.token,
      productReviewFixture.dadosValidos.product_id,
      review,
      productReviewFixture.dadosValidos.reviewer,
      productReviewFixture.dadosValidos.reviewer_email,
      productReviewFixture.dadosValidos.rating
    ).then(response => {
      const id = response.body.id
      cy.deleteProductReviewWooCommercer(
        tokenFixture.token,
        id,
        productReviewFixture.dadosDeletar.force
      ).then(response => {
        expect(response.status).to.be.eq(statusFixture.ok)
        expect(response.body.previous.product_id).to.be.eq(
          productReviewFixture.dadosValidos.product_id
        )
        expect(response.body.previous.review).to.be.eq(review)
        expect(response.body.previous.reviewer).to.be.eq(
          productReviewFixture.dadosValidos.reviewer
        )
        expect(response.body.previous.reviewer_email).to.be.eq(
          productReviewFixture.dadosValidos.reviewer_email
        )
        expect(response.body.previous.rating).to.be.eq(
          productReviewFixture.dadosValidos.rating
        )
      })
    })
  })

  it('Deleting Product Review - Contrato', () => {
    const review = faker.lorem.paragraph()
    cy.postProductReviewWooCommercer(
      tokenFixture.token,
      productReviewFixture.dadosValidos.product_id,
      review,
      productReviewFixture.dadosValidos.reviewer,
      productReviewFixture.dadosValidos.reviewer_email,
      productReviewFixture.dadosValidos.rating
    ).then(response => {
      const id = response.body.id
      cy.deleteProductReviewWooCommercer(
        tokenFixture.token,
        id,
        productReviewFixture.dadosDeletar.force
      ).then(response => {
        return productReviewSchemaDelete.validateAsync(response.body)
      })
    })
  })
})
