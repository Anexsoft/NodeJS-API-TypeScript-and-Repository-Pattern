import express = require('express');
import { createContainer, asClass } from "awilix";
import { scopePerRequest } from "awilix-express";
import { TestService } from "./services/test.service";
import { SubscriptionMySQLRepository } from './services/repositories/impl/mysql/subscription.repository';
import { SubscriptionService } from './services/subscription.service';
import { MovementMySQLRepository } from './services/repositories/impl/mysql/movement.repository';
import { BalanceMysqlRepository } from './services/repositories/impl/mysql/balance.repository';
import { MovementService } from './services/movement.service';
import { SubscriptionMSSQLRepository } from './services/repositories/impl/mssql/subscription.repository';
import { MovementMSSQLRepository } from './services/repositories/impl/mssql/movement.repository';
import { BalanceMSSQLRepository } from './services/repositories/impl/mssql/balance.repository';
import { SubscriptionMockRepository } from './services/repositories/impl/mock/subscription.repository';

export default (app: express.Application): void => {
    const container = createContainer({
        injectionMode: 'CLASSIC'
    });

    container.register({
        // repositories
        // subscriptionRepository: asClass(SubscriptionMockRepository).scoped(),
        // movementRepository: asClass(MovementMSSQLRepository).scoped(),
        // balanceRepository: asClass(BalanceMSSQLRepository).scoped(),
        // subscriptionRepository: asClass(SubscriptionMSSQLRepository).scoped(),
        // movementRepository: asClass(MovementMSSQLRepository).scoped(),
        // balanceRepository: asClass(BalanceMSSQLRepository).scoped(),
        subscriptionRepository: asClass(SubscriptionMySQLRepository).scoped(),
        movementRepository: asClass(MovementMySQLRepository).scoped(),
        balanceRepository: asClass(BalanceMysqlRepository).scoped(),

        // services
        subscriptionService: asClass(SubscriptionService).scoped(),
        movementService: asClass(MovementService).scoped(),
        testService: asClass(TestService).scoped()
    });

    app.use(scopePerRequest(container));
};