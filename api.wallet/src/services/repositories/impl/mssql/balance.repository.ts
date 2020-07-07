import connector from "../../../../common/persistence/mssql.persistence";
import { Balance } from "../../domain/balance";
import { BalanceRepository } from "../../balance.repository";

export class BalanceMSSQLRepository implements BalanceRepository {
    public async find(id: number): Promise<Balance | null> {
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance WHERE id = ${id}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }

        return null;
    }

    public async findByUserId(userId: number): Promise<Balance | null> {
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance WHERE user_id = ${userId}`;

        if (result.rowsAffected) {
            return result.recordset[0];
        }

        return null;
    }

    public async all(): Promise<Balance[]> {
        const pool = await connector;
        const result = await pool.query`SELECT * FROM wallet_balance ORDER BY id DESC`;

        return result.recordset;
    }

    public async store(entry: Balance): Promise<void> {
        const pool = await connector;
        const now = new Date();

        entry.created_at = now;

        await pool.query
            `INSERT INTO wallet_balance(user_id, amount, created_at)
             VALUES(${entry.user_id}, ${entry.amount}, ${entry.created_at})`;
    }

    public async update(entry: Balance): Promise<void> {
        const pool = await connector;
        const now = new Date();

        entry.updated_at = now;

        await pool.query
            `UPDATE wallet_balance
             SET user_id = ${entry.user_id},
                 amount = ${entry.amount},
                 updated_at = ${entry.updated_at}
             WHERE id = ${entry.id}`;
    }

    public async remove(id: number): Promise<void> {
        const pool = await connector;

        await pool.query`DELETE FROM wallet_balance WHERE id = ${id}`;
    }
}