import { Subscription } from "./domain/subscription";

export interface SubscriptionRepository {
    all(): Promise<Subscription[]>;
    find(id: Number): Promise<Subscription | null>;
    findByUserIdAndCode(user_id: Number, code: string): Promise<Subscription | null>;
    store(entry: Subscription): Promise<void>;
    update(entry: Subscription): Promise<void>;
    remove(id: Number): Promise<void>;
}