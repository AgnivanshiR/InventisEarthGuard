import { db } from "./db";
import { regions } from "@shared/schema";

async function seedRegions() {
  try {
    // Check if regions already exist
    const existingRegions = await db.select().from(regions);
    
    if (existingRegions.length === 0) {
      console.log("Seeding initial region data...");
      
      // Insert initial region data
      await db.insert(regions).values([
        {
          title: "Northern Region",
          description: "Coverage across the Himalayan seismic zone, including major cities like Delhi, Chandigarh, and Dehradun.",
          sensors: 450,
        },
        {
          title: "Western Region",
          description: "Kutch and surrounding areas in Gujarat with extended coverage to Mumbai and parts of Maharashtra.",
          sensors: 350,
        },
        {
          title: "Eastern Region",
          description: "Coverage across the northeastern states including Assam, Meghalaya, and parts of West Bengal.",
          sensors: 300,
        },
        {
          title: "Central Region",
          description: "Narmada-Son lineament and surrounding areas with growing coverage in central India.",
          sensors: 200,
        },
      ]);
      
      console.log("Region data seeded successfully!");
    } else {
      console.log("Regions already exist in the database. Skipping seed.");
    }
  } catch (error) {
    console.error("Error seeding regions:", error);
  }
}

// Export the seed function to be called from index.ts
export async function seedDatabase() {
  await seedRegions();
}