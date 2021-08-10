import { AddAccountModel } from '../../domain/usecases/add_account'
import { AccountModel } from '../../domain/models/account'

export interface AddAccountRepository {
  add: (accountData: AddAccountModel) => Promise<AccountModel>
}
