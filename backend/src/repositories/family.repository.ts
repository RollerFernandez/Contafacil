import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {ConnectionDataSource} from '../datasources';
import {Balance, Family, FamilyRelations} from '../models';
import {BalanceRepository} from './balance.repository';

export class FamilyRepository extends DefaultCrudRepository<
  Family,
  typeof Family.prototype.id,
  FamilyRelations
> {

  public readonly balances: HasManyRepositoryFactory<Balance, typeof Family.prototype.id>;

  constructor(
    @inject('datasources.connection') dataSource: ConnectionDataSource, @repository.getter('BalanceRepository') protected balanceRepositoryGetter: Getter<BalanceRepository>,
  ) {
    super(Family, dataSource);
    this.balances = this.createHasManyRepositoryFactoryFor('balances', balanceRepositoryGetter,);
    this.registerInclusionResolver('balances', this.balances.inclusionResolver);
  }

  public async listOfCalculate(id: number, year: number, month: string, datapoint: string) {

    const result = await this.dataSource.execute('CALL sp_familysumary (?,?,?,?)', [id, year, month, datapoint]);

    return result;
  }

  public async listOfResumen(id: number, year: number, datapoint: string) {
    const result = await this.dataSource.execute('CALL sp_familysumary_resumen (?,?,?)', [id, year, datapoint]);
    return result;
  }
}
