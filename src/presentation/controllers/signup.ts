import { HttpRequest, HttpResponse } from '../protocols/http'

import { MissingParamError } from '../errors/missing_param_error'

import { badRequest } from '../helpers/http_helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let response: HttpResponse = { statusCode: 0, body: {} }

    if (!httpRequest.body.name) {
      response = badRequest(new MissingParamError('name'))
    }

    if (!httpRequest.body.email) {
      response = badRequest(new MissingParamError('email'))
    }

    return response
  }
}
