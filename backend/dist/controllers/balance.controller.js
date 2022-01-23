"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BalanceController = void 0;
const tslib_1 = require("tslib");
const repository_1 = require("@loopback/repository");
const rest_1 = require("@loopback/rest");
const models_1 = require("../models");
const repositories_1 = require("../repositories");
let BalanceController = class BalanceController {
    constructor(balanceRepository) {
        this.balanceRepository = balanceRepository;
    }
    async create(balance) {
        return this.balanceRepository.create(balance);
    }
    async count(where) {
        return this.balanceRepository.count(where);
    }
    async find(filter) {
        return this.balanceRepository.find(filter);
    }
    async updateAll(balance, where) {
        return this.balanceRepository.updateAll(balance, where);
    }
    async findById(id, filter) {
        return this.balanceRepository.findById(id, filter);
    }
    async updateById(id, balance) {
        await this.balanceRepository.updateById(id, balance);
    }
    async replaceById(id, balance) {
        await this.balanceRepository.replaceById(id, balance);
    }
    async deleteById(id) {
        await this.balanceRepository.deleteById(id);
    }
};
(0, tslib_1.__decorate)([
    (0, rest_1.post)('/balances'),
    (0, rest_1.response)(200, {
        description: 'Balance model instance',
        content: { 'application/json': { schema: (0, rest_1.getModelSchemaRef)(models_1.Balance) } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Balance, {
                    title: 'NewBalance',
                    exclude: ['id'],
                }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BalanceController.prototype, "create", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/balances/count'),
    (0, rest_1.response)(200, {
        description: 'Balance model count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, rest_1.param.where(models_1.Balance)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BalanceController.prototype, "count", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/balances'),
    (0, rest_1.response)(200, {
        description: 'Array of Balance model instances',
        content: {
            'application/json': {
                schema: {
                    type: 'array',
                    items: (0, rest_1.getModelSchemaRef)(models_1.Balance, { includeRelations: true }),
                },
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.filter(models_1.Balance)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BalanceController.prototype, "find", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/balances'),
    (0, rest_1.response)(200, {
        description: 'Balance PATCH success count',
        content: { 'application/json': { schema: repository_1.CountSchema } },
    }),
    (0, tslib_1.__param)(0, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Balance, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__param)(1, rest_1.param.where(models_1.Balance)),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [models_1.Balance, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BalanceController.prototype, "updateAll", null);
(0, tslib_1.__decorate)([
    (0, rest_1.get)('/balances/{id}'),
    (0, rest_1.response)(200, {
        description: 'Balance model instance',
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Balance, { includeRelations: true }),
            },
        },
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, rest_1.param.filter(models_1.Balance, { exclude: 'where' })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, Object]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BalanceController.prototype, "findById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.patch)('/balances/{id}'),
    (0, rest_1.response)(204, {
        description: 'Balance PATCH success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)({
        content: {
            'application/json': {
                schema: (0, rest_1.getModelSchemaRef)(models_1.Balance, { partial: true }),
            },
        },
    })),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, models_1.Balance]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BalanceController.prototype, "updateById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.put)('/balances/{id}'),
    (0, rest_1.response)(204, {
        description: 'Balance PUT success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__param)(1, (0, rest_1.requestBody)()),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number, models_1.Balance]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BalanceController.prototype, "replaceById", null);
(0, tslib_1.__decorate)([
    (0, rest_1.del)('/balances/{id}'),
    (0, rest_1.response)(204, {
        description: 'Balance DELETE success',
    }),
    (0, tslib_1.__param)(0, rest_1.param.path.number('id')),
    (0, tslib_1.__metadata)("design:type", Function),
    (0, tslib_1.__metadata)("design:paramtypes", [Number]),
    (0, tslib_1.__metadata)("design:returntype", Promise)
], BalanceController.prototype, "deleteById", null);
BalanceController = (0, tslib_1.__decorate)([
    (0, tslib_1.__param)(0, (0, repository_1.repository)(repositories_1.BalanceRepository)),
    (0, tslib_1.__metadata)("design:paramtypes", [repositories_1.BalanceRepository])
], BalanceController);
exports.BalanceController = BalanceController;
//# sourceMappingURL=balance.controller.js.map