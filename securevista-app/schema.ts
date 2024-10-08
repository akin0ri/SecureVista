import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const notices = sqliteTable('notices', {
  id: integer('id').primaryKey(),
  user: text('user').notNull(),
  title: text('title').notNull(),
  body: text('body').notNull(),
  tag: text('tag')
});