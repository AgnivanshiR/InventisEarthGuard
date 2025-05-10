import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { 
  insertContactSubmissionSchema, 
  insertNewsletterSubscriptionSchema,
  insertRegionSchema
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes for contact form submissions
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      const contactData = insertContactSubmissionSchema.parse(req.body);
      const submission = await storage.createContactSubmission(contactData);
      res.status(201).json(submission);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ error: "Failed to submit contact form" });
      }
    }
  });

  app.get("/api/contact", async (req: Request, res: Response) => {
    try {
      const submissions = await storage.getContactSubmissions();
      res.json(submissions);
    } catch (error) {
      console.error("Error fetching contact submissions:", error);
      res.status(500).json({ error: "Failed to fetch contact submissions" });
    }
  });

  // API routes for newsletter subscriptions
  app.post("/api/newsletter/subscribe", async (req: Request, res: Response) => {
    try {
      const subscriptionData = insertNewsletterSubscriptionSchema.parse(req.body);
      const subscription = await storage.createNewsletterSubscription(subscriptionData);
      res.status(201).json(subscription);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Error subscribing to newsletter:", error);
        res.status(500).json({ error: "Failed to subscribe to newsletter" });
      }
    }
  });

  app.get("/api/newsletter/subscribers", async (req: Request, res: Response) => {
    try {
      const subscribers = await storage.getNewsletterSubscriptions();
      res.json(subscribers);
    } catch (error) {
      console.error("Error fetching newsletter subscribers:", error);
      res.status(500).json({ error: "Failed to fetch newsletter subscribers" });
    }
  });

  // API routes for regions
  app.get("/api/regions", async (req: Request, res: Response) => {
    try {
      const regions = await storage.getRegions();
      res.json(regions);
    } catch (error) {
      console.error("Error fetching regions:", error);
      res.status(500).json({ error: "Failed to fetch regions" });
    }
  });

  app.post("/api/regions", async (req: Request, res: Response) => {
    try {
      const regionData = insertRegionSchema.parse(req.body);
      const region = await storage.createRegion(regionData);
      res.status(201).json(region);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ error: error.errors });
      } else {
        console.error("Error creating region:", error);
        res.status(500).json({ error: "Failed to create region" });
      }
    }
  });

  app.get("/api/regions/:id", async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ error: "Invalid region ID" });
      }
      
      const region = await storage.getRegion(id);
      if (!region) {
        return res.status(404).json({ error: "Region not found" });
      }
      
      res.json(region);
    } catch (error) {
      console.error("Error fetching region:", error);
      res.status(500).json({ error: "Failed to fetch region" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
