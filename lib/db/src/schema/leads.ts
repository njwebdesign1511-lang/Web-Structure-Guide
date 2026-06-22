import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const leads = pgTable("leads", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  phone: text("phone").notNull(),
  email: text("email"),
  vehicle: text("vehicle"),
  service: text("service"),
  preferredDate: text("preferred_date"),
  message: text("message"),
  lang: text("lang").default("en"),
  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
});
