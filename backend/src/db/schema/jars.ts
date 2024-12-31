import {
  pgTable,
  varchar,
  numeric,
  text,
  integer,
  boolean,
  jsonb,
} from 'drizzle-orm/pg-core';
import { timestamps } from './helpers';
import { relations } from 'drizzle-orm';
import { donations } from './donations';

export const jars = pgTable('jars', {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  ownerId: varchar({ length: 255 }).notNull(),
  title: varchar({ length: 255 }).notNull(),
  description: text(),

  minimalPrice: numeric({ precision: 10, scale: 2 }).notNull(),
  totalAmount: numeric({ precision: 15, scale: 2 }).notNull().default('0'),
  totalDonations: integer().default(0).notNull(),
  currency: varchar({ length: 3 }).default('USD').notNull(),

  isActive: boolean().default(true).notNull(),
  metadata: jsonb().default({}),

  ...timestamps,
});

export const jarsRelations = relations(jars, ({ many }) => ({
  donations: many(donations),
}));

export type JarInsert = typeof jars.$inferInsert;
export type JarSelect = typeof jars.$inferSelect;
