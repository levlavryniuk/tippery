import { integer, pgTable, text } from 'drizzle-orm/pg-core';
import { timestamps } from './helpers';
import { relations } from 'drizzle-orm';
import { refreshTokens } from './refresh-tokens';

const users = pgTable('users', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  email: text().notNull().unique(),
  username: text().notNull().unique(),
  password: text().notNull(),
  ...timestamps,
});

export const usersRelations = relations(users, ({ many }) => ({
  refreshTokens: many(refreshTokens),
}));

export type UserSelect = typeof users.$inferSelect;
export type UserInsert = typeof users.$inferInsert;

export { users };
