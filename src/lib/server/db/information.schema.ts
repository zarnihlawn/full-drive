import { boolean, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { user } from "./schema";

export const folder = pgTable("folder", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  parentId: text("parent_id"),
  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  isDeleted: boolean("is_deleted").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});


export const file = pgTable("file", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),

  folderId: text("folder_id")
    .references(() => folder.id, { onDelete: "set null" }),

  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  size: text("size").notNull(), // store as bigint in prod

  mimeType: text("mime_type"),

  storagePath: text("storage_path").notNull(),

  isDeleted: boolean("is_deleted").default(false).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const team = pgTable("team", {
  id: text("id").primaryKey(),

  name: text("name").notNull(),

  ownerId: text("owner_id")
    .notNull()
    .references(() => user.id),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});


export const teamMember = pgTable("team_member", {
  id: text("id").primaryKey(),

  teamId: text("team_id")
    .notNull()
    .references(() => team.id, { onDelete: "cascade" }),

  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  role: text("role").notNull(),
  // owner | admin | member | viewer
});


export const filePermission = pgTable("file_permission", {
  id: text("id").primaryKey(),

  fileId: text("file_id")
    .notNull()
    .references(() => file.id, { onDelete: "cascade" }),

  userId: text("user_id")
    .references(() => user.id, { onDelete: "cascade" }),

  permission: text("permission").notNull(),
  // read | write | admin
});


export const usage = pgTable("usage", {
  userId: text("user_id")
    .primaryKey()
    .references(() => user.id, { onDelete: "cascade" }),

  storageUsed: text("storage_used").notNull().default("0"),

  fileCount: text("file_count").notNull().default("0"),

  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});
