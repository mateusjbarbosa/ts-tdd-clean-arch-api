import { Controller, EmailValidator, HttpRequest, HttpResponse } from '../protocols'

import { badRequest, serverError } from '../helpers/http_helper'

import { InvalidParamError, MissingParamError } from '../errors'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']

    const { body } = httpRequest
    const { email, password, passwordConfirmation } = body

    try {
      for (const field of requiredFields) {
        if (!body[field]) {
          return badRequest(new MissingParamError(field))
        }
      }

      if (password !== passwordConfirmation) {
        return badRequest(new InvalidParamError('passwordConfirmation'))
      }

      const emailIsValid = this.emailValidator.isValid(email)

      if (!emailIsValid) {
        return badRequest(new InvalidParamError('email'))
      }
    } catch (e) {
      return serverError()
    }
  }
}
