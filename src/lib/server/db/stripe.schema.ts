import { boolean, index, jsonb, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./auth.schema";

export const stripeCustomer = pgTable("stripe_customer", {
  id: text("id").primaryKey(), // stripe customer id (cus_xxx)
  userId: text("user_id")
    .notNull()
    .unique()
    .references(() => user.id, { onDelete: "cascade" }),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const subscription = pgTable(
  "subscription",
  {
    id: text("id").primaryKey(), // Stripe sub_xxx

    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    customerId: text("customer_id").notNull(), // Stripe cus_xxx

    priceId: text("price_id").notNull(),

    status: text("status").notNull(),

    planTier: text("plan_tier")
      .notNull()
      .default("free"),
    // free | pro | enterprise

    trialEndsAt: timestamp("trial_ends_at"),

    canceledAt: timestamp("canceled_at"),

    metadata: jsonb("metadata")
      .$type<Record<string, any>>() // strong typing
      .default({}),

    currentPeriodStart: timestamp("current_period_start"),
    currentPeriodEnd: timestamp("current_period_end"),

    cancelAtPeriodEnd: boolean("cancel_at_period_end").default(false).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),

    updatedAt: timestamp("updated_at")
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("subscription_userId_idx").on(table.userId),
  ]
);

export const stripeEvent = pgTable("stripe_event", {
  id: text("id").primaryKey(), // evt_xxx
  type: text("type").notNull(),
  createdAt: timestamp("created_at").notNull(),
  processedAt: boolean("processed_at").default(false).notNull(),
});
