import type { Database } from '../';

export class TagRepository{
    constructor(private readonly db: Database) {}

    async getTagsByUserId(userId: string){
        return this.database.query.tag.findMany({
            where(tag, { eq }) => eq(tag.userId, userId),
        });
    }
}