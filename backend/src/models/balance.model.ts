import {Entity, model, property} from '@loopback/repository';

@model()
export class Balance extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
    required: true,
  })
  amount: number;

  @property({
    type: 'date',
    required: true,
  })
  date: string;

  @property({
    type: 'number',
  })
  familyId?: number;

  constructor(data?: Partial<Balance>) {
    super(data);
  }
}

export interface BalanceRelations {
  // describe navigational properties here
}

export type BalanceWithRelations = Balance & BalanceRelations;
