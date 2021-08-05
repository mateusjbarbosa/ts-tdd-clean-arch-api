import { HttpRequest, HttpResponse } from '../protocols/http'

import { MissingParamError } from '../errors/missing_param_error'

import { badRequest } from '../helpers/http_helper'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email']
    let response: HttpResponse = { statusCode: 0, body: {} }

    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        response = badRequest(new MissingParamError(field))
      }
    }

    return response
  }
}
