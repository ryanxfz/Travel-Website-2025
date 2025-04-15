import {drizzle} from 'drizzle-orm/node-postgres';
import { ENV } from '../../config/env.config';

export const db = drizzle({
    connection: ENV.DATABASE_URL,
    casing: 'snake_case',
});

export type Database = typeof db;