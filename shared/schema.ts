import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { relations } from "drizzle-orm";

// Users table
export const users = sqliteTable("users", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  createdAt: text("created_at").notNull(),
});

export const usersRelations = relations(users, ({ many }) => ({
  contactSubmissions: many(contactSubmissions),
}));

// Contact form submissions table
export const contactSubmissions = sqliteTable("contact_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  consent: integer("consent", { mode: "boolean" }).notNull().default(true),
  userId: integer("user_id").references(() => users.id),
  createdAt: text("created_at").notNull(),
});

export const contactSubmissionsRelations = relations(contactSubmissions, ({ one }) => ({
  user: one(users, {
    fields: [contactSubmissions.userId],
    references: [users.id],
  }),
}));

// Newsletter subscriptions table
export const newsletterSubscriptions = sqliteTable("newsletter_subscriptions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  email: text("email").notNull().unique(),
  active: integer("active", { mode: "boolean" }).notNull().default(true),
  createdAt: text("created_at").notNull(),
});

// Regions table for coverage areas
export const regions = sqliteTable("regions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  sensors: integer("sensors").notNull(),
  createdAt: text("created_at").notNull(),
});

// Schema definitions for insertions

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertContactSubmissionSchema = createInsertSchema(contactSubmissions).pick({
  name: true,
  email: true,
  subject: true,
  message: true,
  consent: true,
  userId: true,
});

export const insertNewsletterSubscriptionSchema = createInsertSchema(newsletterSubscriptions).pick({
  email: true,
});

export const insertRegionSchema = createInsertSchema(regions).pick({
  title: true,
  description: true,
  sensors: true,
});

// Type definitions

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertContactSubmission = z.infer<typeof insertContactSubmissionSchema>;
export type ContactSubmission = typeof contactSubmissions.$inferSelect;

export type InsertNewsletterSubscription = z.infer<typeof insertNewsletterSubscriptionSchema>;
export type NewsletterSubscription = typeof newsletterSubscriptions.$inferSelect;

export type InsertRegion = z.infer<typeof insertRegionSchema>;
export type Region = typeof regions.$inferSelect;
