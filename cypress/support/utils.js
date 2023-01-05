Cypress.Commands.add('validarContrato', function (contrato, responseContrato) {
  return contrato.validateAsync(responseContrato)
})
