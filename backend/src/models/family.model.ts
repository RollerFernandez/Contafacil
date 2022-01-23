import {Entity, model, property, hasMany} from '@loopback/repository';
import {Balance} from './balance.model';

@model()
export class Family extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  name: string;

  @hasMany(() => Balance)
  balances: Balance[];

  constructor(data?: Partial<Family>) {
    super(data);
  }
}

export interface FamilyRelations {
  // describe navigational properties here
}

export type FamilyWithRelations = Family & FamilyRelations;
