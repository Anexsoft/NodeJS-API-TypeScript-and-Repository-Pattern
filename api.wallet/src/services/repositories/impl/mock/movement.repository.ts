import db from "../../../../common/persistence/mock.persistence";
import { MovementRepository } from "../../movement.repository";
import { Movement } from "../../domain/movement";

export class MovementMockRepository implements MovementRepository {
    public async find(id: number): Promise<Movement | null> {
        const table = db.movements as Movement[];
        const result = table.find(x => x.id === id);

        if (result) {
            return Object.assign({ ...result });
        }

        return null;
    }

    public async all(): Promise<Movement[]> {
        const table = db.movements as Movement[];
        return Object.assign([...table]);
    }

    public async store(entry: Movement): Promise<void> {
        const table = db.movements as Movement[];
        const now = new Date();

        db._movementId++;

        table.push({
            id: db._movementId,
            type: entry.type,
            amount: entry.amount,
            user_id: entry.user_id,
            created_at: now,
            updated_at: null,
        } as Movement);
    }

    public async update(entry: Movement): Promise<void> {
        const table = db.movements as Movement[];
        const now = new Date();

        const originalEntry = table.find(x => x.id === entry.id);

        if (originalEntry) {
            originalEntry.type = entry.type;
            originalEntry.user_id = entry.user_id;
            originalEntry.amount = entry.amount;
            originalEntry.updated_at = now;
        }
    }

    public async remove(id: number): Promise<void> {
        let table = db.movements as Movement[];
        db.movements = table.filter(x => x.id === id) as any;
    }
}