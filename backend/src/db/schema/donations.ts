import {
  pgTable,
  varchar,
  numeric,
  text,
  timestamp,
  boolean,
  jsonb,
  integer,
  pgEnum,
} from 'drizzle-orm/pg-core';
import { jars } from './jars';
import { timestamps } from './helpers';
import { relations } from 'drizzle-orm';
import { users } from './users';

export const paymentMethod = pgEnum('paymentMethod', ['stripe', 'paypal']);

export const donations = pgTable('donations', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  jarId: varchar({ length: 256 }).notNull(),
  userId: varchar({ length: 256 }),
  amount: numeric({ precision: 10, scale: 2 }).notNull(),
  currency: varchar({ length: 3 }).default('USD').notNull(),

  transactionId: varchar({ length: 255 }).notNull(),
  paymentMethod: paymentMethod().notNull(),

  note: text(),
  isRefunded: boolean().default(false).notNull(),
  metadata: jsonb().default({}),

  refundedAt: timestamp(),
  ...timestamps,
});

export const donationsRelations = relations(donations, ({ one }) => ({
  jar: one(jars, {
    fields: [donations.jarId],
    references: [jars.id],
  }),
  user: one(users, {
    fields: [donations.userId],
    references: [users.id],
  }),
}));

export type DonationInsert = typeof donations.$inferInsert;
export type DonationSelect = typeof donations.$inferSelect;
