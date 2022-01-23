// import {
//   Count,
//   CountSchema,
//   Filter,
//   repository,
//   Where,
// } from '@loopback/repository';
// import {
//   del,
//   get,
//   getModelSchemaRef,
//   getWhereSchemaFor,
//   param,
//   patch,
//   post,
//   requestBody,
// } from '@loopback/rest';
// import {
//   Family,
//   Balance,
// } from '../models';
// import {FamilyRepository} from '../repositories';

// export class FamilyBalanceController {
//   constructor(
//     @repository(FamilyRepository) protected familyRepository: FamilyRepository,
//   ) { }

//   @get('/families/{id}/balances', {
//     responses: {
//       '200': {
//         description: 'Array of Family has many Balance',
//         content: {
//           'application/json': {
//             schema: {type: 'array', items: getModelSchemaRef(Balance)},
//           },
//         },
//       },
//     },
//   })
//   async find(
//     @param.path.number('id') id: number,
//     @param.query.object('filter') filter?: Filter<Balance>,
//   ): Promise<Balance[]> {
//     return this.familyRepository.balances(id).find(filter);
//   }

//   @post('/families/{id}/balances', {
//     responses: {
//       '200': {
//         description: 'Family model instance',
//         content: {'application/json': {schema: getModelSchemaRef(Balance)}},
//       },
//     },
//   })
//   async create(
//     @param.path.number('id') id: typeof Family.prototype.id,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Balance, {
//             title: 'NewBalanceInFamily',
//             exclude: ['id'],
//             optional: ['familyId']
//           }),
//         },
//       },
//     }) balance: Omit<Balance, 'id'>,
//   ): Promise<Balance> {
//     return this.familyRepository.balances(id).create(balance);
//   }

//   @patch('/families/{id}/balances', {
//     responses: {
//       '200': {
//         description: 'Family.Balance PATCH success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async patch(
//     @param.path.number('id') id: number,
//     @requestBody({
//       content: {
//         'application/json': {
//           schema: getModelSchemaRef(Balance, {partial: true}),
//         },
//       },
//     })
//     balance: Partial<Balance>,
//     @param.query.object('where', getWhereSchemaFor(Balance)) where?: Where<Balance>,
//   ): Promise<Count> {
//     return this.familyRepository.balances(id).patch(balance, where);
//   }

//   @del('/families/{id}/balances', {
//     responses: {
//       '200': {
//         description: 'Family.Balance DELETE success count',
//         content: {'application/json': {schema: CountSchema}},
//       },
//     },
//   })
//   async delete(
//     @param.path.number('id') id: number,
//     @param.query.object('where', getWhereSchemaFor(Balance)) where?: Where<Balance>,
//   ): Promise<Count> {
//     return this.familyRepository.balances(id).delete(where);
//   }
// }
