export const DB_KEY = 'DATABASE_CONNECTION';
import * as schema from '../db/schema';
import { NeonHttpDatabase } from 'drizzle-orm/neon-http';

export type Db = NeonHttpDatabase<typeof schema>;
