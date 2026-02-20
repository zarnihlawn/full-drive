import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";
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

// aggregate usage per team (for team plans / billing)
export const teamUsage = pgTable("team_usage", {
  teamId: text("team_id")
    .primaryKey()
    .references(() => team.id, { onDelete: "cascade" }),

  storageUsed: text("storage_used").notNull().default("0"),

  fileCount: text("file_count").notNull().default("0"),

  updatedAt: timestamp("updated_at")
    .$onUpdate(() => new Date())
    .notNull(),
});

// immutable history of file versions (for versioning/restore UI)
export const fileVersion = pgTable(
  "file_version",
  {
    id: text("id").primaryKey(),

    fileId: text("file_id")
      .notNull()
      .references(() => file.id, { onDelete: "cascade" }),

    size: text("size").notNull(),

    mimeType: text("mime_type"),

    storagePath: text("storage_path").notNull(),

    checksum: text("checksum"),

    createdBy: text("created_by").references(() => user.id, {
      onDelete: "set null",
    }),

    isCurrent: boolean("is_current").default(true).notNull(),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("file_version_file_id_idx").on(table.fileId)],
);

// public share links for files or folders
export const shareLink = pgTable(
  "share_link",
  {
    id: text("id").primaryKey(),

    fileId: text("file_id").references(() => file.id, {
      onDelete: "cascade",
    }),

    folderId: text("folder_id").references(() => folder.id, {
      onDelete: "cascade",
    }),

    token: text("token").notNull().unique(),

    permission: text("permission").notNull(),
    // read | write

    expiresAt: timestamp("expires_at"),

    createdBy: text("created_by")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("share_link_file_id_idx").on(table.fileId)],
);

// high-level activity log for auditing
export const activityLog = pgTable(
  "activity_log",
  {
    id: text("id").primaryKey(),

    userId: text("user_id").references(() => user.id, {
      onDelete: "set null",
    }),

    fileId: text("file_id").references(() => file.id, {
      onDelete: "set null",
    }),

    folderId: text("folder_id").references(() => folder.id, {
      onDelete: "set null",
    }),

    action: text("action").notNull(),
    // upload | update | delete | restore | move | share | unshare ...

    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),

    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("activity_log_user_id_idx").on(table.userId),
    index("activity_log_file_id_idx").on(table.fileId),
  ],
);
