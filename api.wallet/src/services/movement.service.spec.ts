import { MovementService } from './movement.service';
import { MovementMockRepository } from './repositories/impl/mock/movement.repository';
import { BalanceMockRepository } from './repositories/impl/mock/balance.repository';
import { MovementCreateDto } from '../dtos/movement.dto';
import assert = require('assert');

const movementService = new MovementService(
    new MovementMockRepository(),
    new BalanceMockRepository()
);

describe('Movement.Service', () => {
    describe('Store', () => {
        it('tries to register an income movement', async () => {
            await movementService.store({
                user_id: 1,
                type: 0,
                amount: 200
            } as MovementCreateDto);
        });

        it('tries to register an outcome movement', async () => {
            await movementService.store({
                user_id: 2,
                type: 1,
                amount: 100
            } as MovementCreateDto);
        });

        it('tries to register an outcome movement with insufficient balance', async () => {
            try {
                await movementService.store({
                    user_id: 1,
                    type: 1,
                    amount: 200
                } as MovementCreateDto);
            } catch (error) {
                assert.equal(error.message, 'User does not have enough balance.');
            }
        });

        it('tries to register an unexpected movement', async () => {
            try {
                await movementService.store({
                    user_id: 1,
                    type: 9999,
                    amount: 200
                } as MovementCreateDto);
            } catch (error) {
                assert.equal(error.message, 'Invalid movement type supplied.');
            }
        });
    });
});