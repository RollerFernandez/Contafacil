import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {ConnectionDataSource} from '../datasources';
import {Balance, BalanceRelations} from '../models';

export class BalanceRepository extends DefaultCrudRepository<
  Balance,
  typeof Balance.prototype.id,
  BalanceRelations
> {
  constructor(
    @inject('datasources.connection') dataSource: ConnectionDataSource,
  ) {
    super(Balance, dataSource);
  }
}
