import { and, eq } from "drizzle-orm";
import { db } from "./db";
import {
  users,
  contactSubmissions,
  newsletterSubscriptions,
  regions,
  type User,
  type InsertUser,
  type ContactSubmission,
  type InsertContactSubmission,
  type NewsletterSubscription,
  type InsertNewsletterSubscription,
  type Region,
  type InsertRegion
} from "@shared/schema";

export interface IStorage {
  // User operations
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact submission operations
  getContactSubmissions(): Promise<ContactSubmission[]>;
  getContactSubmission(id: number): Promise<ContactSubmission | undefined>;
  createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission>;
  
  // Newsletter subscription operations
  getNewsletterSubscriptions(): Promise<NewsletterSubscription[]>;
  getNewsletterSubscription(email: string): Promise<NewsletterSubscription | undefined>;
  createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription>;
  
  // Region operations
  getRegions(): Promise<Region[]>;
  getRegion(id: number): Promise<Region | undefined>;
  createRegion(region: InsertRegion): Promise<Region>;
}

export class DatabaseStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values({
        ...insertUser,
        createdAt: new Date().toISOString()
      })
      .returning();
    return user;
  }
  
  // Contact submission operations
  async getContactSubmissions(): Promise<ContactSubmission[]> {
    return await db.select().from(contactSubmissions);
  }
  
  async getContactSubmission(id: number): Promise<ContactSubmission | undefined> {
    const [submission] = await db.select().from(contactSubmissions).where(eq(contactSubmissions.id, id));
    return submission;
  }
  
  async createContactSubmission(submission: InsertContactSubmission): Promise<ContactSubmission> {
    const [newSubmission] = await db
      .insert(contactSubmissions)
      .values({
        ...submission,
        createdAt: new Date().toISOString()
      })
      .returning();
    return newSubmission;
  }
  
  // Newsletter subscription operations
  async getNewsletterSubscriptions(): Promise<NewsletterSubscription[]> {
    return await db.select().from(newsletterSubscriptions).where(eq(newsletterSubscriptions.active, true));
  }
  
  async getNewsletterSubscription(email: string): Promise<NewsletterSubscription | undefined> {
    const [subscription] = await db
      .select()
      .from(newsletterSubscriptions)
      .where(eq(newsletterSubscriptions.email, email));
    return subscription;
  }
  
  async createNewsletterSubscription(subscription: InsertNewsletterSubscription): Promise<NewsletterSubscription> {
    // Check if email already exists but is inactive
    const existingSubscription = await this.getNewsletterSubscription(subscription.email);
    
    if (existingSubscription) {
      if (!existingSubscription.active) {
        // Reactivate the subscription
        const [updatedSubscription] = await db
          .update(newsletterSubscriptions)
          .set({ active: true })
          .where(eq(newsletterSubscriptions.id, existingSubscription.id))
          .returning();
        return updatedSubscription;
      }
      // Email already exists and is active, return existing subscription
      return existingSubscription;
    }
    
    // Create new subscription
    const [newSubscription] = await db
      .insert(newsletterSubscriptions)
      .values({
        ...subscription,
        createdAt: new Date().toISOString()
      })
      .returning();
    return newSubscription;
  }
  
  // Region operations
  async getRegions(): Promise<Region[]> {
    return await db.select().from(regions);
  }
  
  async getRegion(id: number): Promise<Region | undefined> {
    const [region] = await db.select().from(regions).where(eq(regions.id, id));
    return region;
  }
  
  async createRegion(region: InsertRegion): Promise<Region> {
    const [newRegion] = await db
      .insert(regions)
      .values({
        ...region,
        createdAt: new Date().toISOString()
      })
      .returning();
    return newRegion;
  }
}

export const storage = new DatabaseStorage();
