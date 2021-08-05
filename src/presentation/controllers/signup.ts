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
    let response: HttpResponse = { statusCode: 0, body: {} }

    try {
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          response = badRequest(new MissingParamError(field))
        }
      }

      const emailIsValid = this.emailValidator.isValid(httpRequest.body.email)

      if (!emailIsValid) {
        response = badRequest(new InvalidParamError('email'))
      }
    } catch (e) {
      response = serverError()
    }

    return response
  }
}
