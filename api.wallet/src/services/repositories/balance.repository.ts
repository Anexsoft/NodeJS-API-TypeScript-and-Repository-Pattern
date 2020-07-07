import { Balance } from "./domain/balance";

export interface BalanceRepository {
    find(id: number): Promise<Balance | null>;
    findByUserId(userId: number): Promise<Balance | null>;
    all(): Promise<Balance[]>;
    store(entry: Balance): Promise<void>;
    update(entry: Balance): Promise<void>;
    remove(id: number): Promise<void>;
}