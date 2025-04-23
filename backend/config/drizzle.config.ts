import { defineConfig } from 'drizzle-kit';
import { ENV } from './env.config';

export default defineConfig({
    schema: './src/db/schema',
    dialect: 'postgresql',
    out: './drizzle',
    casing: 'snake_case',
    dbCredentials: {
        url: ENV.DATABASE_URL,
    },
    migrations: {
        table: 'migrations',
    },
});