import { pgTable, text, jsonb, timestamp } from "drizzle-orm/pg-core";

export const siteContentTable = pgTable("site_content", {
  key: text("key").primaryKey(),
  value: jsonb("value").notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow().$onUpdate(() => new Date()),
});

export type SiteContentRow = typeof siteContentTable.$inferSelect;
