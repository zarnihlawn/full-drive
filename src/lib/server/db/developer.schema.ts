import { pgTable, text, timestamp, boolean, jsonb, index } from "drizzle-orm/pg-core";
import { user } from "./schema";

export const apiKey = pgTable(
  "api_key",
  {
    id: text("id").primaryKey(),

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    name: text("name").notNull(),
    // "Production server", "CLI tool", etc.

    keyHash: text("key_hash").notNull().unique(),
    // NEVER store raw key

    prefix: text("prefix").notNull(),
    // store first 8 chars for UI display

    scopes: jsonb("scopes")
      .$type<string[]>()
      .default([]),

    isActive: boolean("is_active").default(true).notNull(),

    lastUsedAt: timestamp("last_used_at"),

    expiresAt: timestamp("expires_at"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("apiKey_userId_idx").on(table.userId),
  ]
);

export const apiUsage = pgTable("api_usage", {
  id: text("id").primaryKey(),

  apiKeyId: text("api_key_id")
    .notNull()
    .references(() => apiKey.id, { onDelete: "cascade" }),

  endpoint: text("endpoint").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});
