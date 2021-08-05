import { Controller } from '../protocols/controller'
import { HttpRequest, HttpResponse } from '../protocols/http'

import { MissingParamError } from '../errors/missing_param_error'

import { badRequest } from '../helpers/http_helper'

export class SignUpController implements Controller {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email', 'password', 'passwordConfirmation']
    let response: HttpResponse = { statusCode: 0, body: {} }

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        response = badRequest(new MissingParamError(field))
      }
    }

    return response
  }
}
