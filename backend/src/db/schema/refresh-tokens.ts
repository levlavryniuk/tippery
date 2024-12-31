import {
  varchar,
  timestamp,
  boolean,
  integer,
  pgTable,
  index,
} from 'drizzle-orm/pg-core';
import { users } from './users';

export const refreshTokens = pgTable(
  'refresh_tokens',
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer()
      .references(() => users.id)
      .notNull(),
    token: varchar({ length: 255 }).unique().notNull(),
    expiresAt: timestamp('', { withTimezone: true }).notNull(),
    revoked: boolean().default(false).notNull(),
    revokedAt: timestamp(),
    createdAt: timestamp().defaultNow().notNull(),
  },
  (t) => [index('token_idx').on(t.token)],
);
