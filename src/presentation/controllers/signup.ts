import { HttpRequest, HttpResponse } from '../protocols/http'

import { MissingParamError } from '../errors/missing_param_error'

export class SignUpController {
  handle (httpRequest: HttpRequest): HttpResponse {
    let response: HttpResponse = { statusCode: 0, body: {} }

    if (!httpRequest.body.name) {
      response = {
        statusCode: 400,
        body: new MissingParamError('name')
      }
    }

    if (!httpRequest.body.email) {
      response = {
        statusCode: 400,
        body: new MissingParamError('email')
      }
    }

    return response
  }
}
