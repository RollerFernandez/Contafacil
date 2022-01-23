import {
  Count,
  CountSchema, FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Family, Familysumary} from '../models';
import {FamilyRepository} from '../repositories';

export class FamilyController {
  constructor(
    @repository(FamilyRepository)
    public familyRepository: FamilyRepository,
  ) { }

  @post('/families')
  @response(200, {
    description: 'Family model instance',
    content: {'application/json': {schema: getModelSchemaRef(Family)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Family, {
            title: 'NewFamily',
            exclude: ['id'],
          }),
        },
      },
    })
    family: Omit<Family, 'id'>,
  ): Promise<Family> {
    return this.familyRepository.create(family);
  }

  @get('/families/count')
  @response(200, {
    description: 'Family model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Family) where?: Where<Family>,
  ): Promise<Count> {
    return this.familyRepository.count(where);
  }

  @get('/families')
  @response(200, {
    description: 'Array of Family model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Family),
        },
      },
    },
  })
  async find(): Promise<Family[]> {
    return this.familyRepository.find();
  }

  @patch('/families')
  @response(200, {
    description: 'Family PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Family, {partial: true}),
        },
      },
    })
    family: Family,
    @param.where(Family) where?: Where<Family>,
  ): Promise<Count> {
    return this.familyRepository.updateAll(family, where);
  }

  @get('/families/{id}')
  @response(200, {
    description: 'Family model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Family, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Family, {exclude: 'where'}) filter?: FilterExcludingWhere<Family>
  ): Promise<Family> {
    return this.familyRepository.findById(id, filter);
  }

  @patch('/families/{id}')
  @response(204, {
    description: 'Family PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Family, {partial: true}),
        },
      },
    })
    family: Family,
  ): Promise<void> {
    await this.familyRepository.updateById(id, family);
  }

  @put('/families/{id}')
  @response(204, {
    description: 'Family PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() family: Family,
  ): Promise<void> {
    await this.familyRepository.replaceById(id, family);
  }

  @del('/families/{id}')
  @response(204, {
    description: 'Family DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.familyRepository.deleteById(id);
  }

  @get('/family_summary')
  @response(200, {
    description: 'Lista de calculados',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Familysumary)
      }
    }
  })
  async getFamilySummary(@param.query.number('family') id: number, @param.query.number('year') year: number, @param.query.string('month') month: string, @param.query.string('datapoint') datapoint: string): Promise<Familysumary> {

    const result = await this.familyRepository.listOfCalculate(id, year, month, datapoint);

    return result[0][0];
  }

  @get('/family_summary_resumen')
  @response(200, {
    description: 'Resumen depositos',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Familysumary)
      }
    }
  })
  async getFamilySummaryResumen(@param.query.number('family') id: number, @param.query.number('year') year: number, @param.query.string('datapoint') datapoint: string): Promise<Familysumary> {

    const result = await this.familyRepository.listOfResumen(id, year, datapoint);

    return result[0];
  }
}


