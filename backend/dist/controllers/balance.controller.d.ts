import { Count, Filter, FilterExcludingWhere, Where } from '@loopback/repository';
import { Balance } from '../models';
import { BalanceRepository } from '../repositories';
export declare class BalanceController {
    balanceRepository: BalanceRepository;
    constructor(balanceRepository: BalanceRepository);
    create(balance: Omit<Balance, 'id'>): Promise<Balance>;
    count(where?: Where<Balance>): Promise<Count>;
    find(filter?: Filter<Balance>): Promise<Balance[]>;
    updateAll(balance: Balance, where?: Where<Balance>): Promise<Count>;
    findById(id: number, filter?: FilterExcludingWhere<Balance>): Promise<Balance>;
    updateById(id: number, balance: Balance): Promise<void>;
    replaceById(id: number, balance: Balance): Promise<void>;
    deleteById(id: number): Promise<void>;
}
