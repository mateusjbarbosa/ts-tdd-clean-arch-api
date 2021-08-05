import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

import { badRequest } from '../helpers/http_helper'
import { EmailValidator } from '../protocols/email_validator'

import { MissingParamError } from '../errors/missing_param_error'
import { InvalidParamError } from '../errors/invalid_param_error'

export class SignUpController implements Controller {
  private readonly emailValidator: EmailValidator

  constructor (emailValidator: EmailValidator) {
    this.emailValidator = emailValidator
  }

  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    let response: HttpResponse = { statusCode: 0, body: {} }

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        response = badRequest(new MissingParamError(field))
      }
    }

    const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)

    if (!emailIsValid) {
      response = badRequest(new InvalidParamError('email'))
    }

    return response
  }
}
