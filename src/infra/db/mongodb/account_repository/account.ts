import { MongoHelper } from '../helpers/mongo_helper'

import { AddAccountRepository } from '../../../../data/protocols/add_account_repository'

import { AccountModel } from '../../../../domain/models/account'
import { AddAccountModel } from '../../../../domain/usecases/add_account'

export class AccountMongoRepository implements AddAccountRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = MongoHelper.getCollection('accounts')

    const result = await accountCollection.insertOne(accountData)
    const account = result.ops[0]

    const { _id, ...accountWithoutId } = account

    return Object.assign({}, accountWithoutId, { id: _id })
  }
}
