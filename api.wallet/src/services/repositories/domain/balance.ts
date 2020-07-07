export interface Balance {
    id: number;
    user_id: number;
    amount: number;
    created_at: Date | null;
    updated_at: Date | null;
}