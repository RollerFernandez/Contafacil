import {Model, model, property} from '@loopback/repository';

@model()
export class Familysumary extends Model {
  @property({
    type: 'number',
    required: true,
  })
  id: number;

  @property({
    type: 'number',
    required: true,
  })
  min: number;

  @property({
    type: 'number',
    required: true,
  })
  max: number;

  constructor(data?: Partial<Familysumary>) {
    super(data);
  }
}

export interface FamilysumaryRelations {
  // describe navigational properties here
}

export type FamilysumaryWithRelations = Familysumary & FamilysumaryRelations;
