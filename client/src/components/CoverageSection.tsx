import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Wifi } from "lucide-react";
import { scrollToElement } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface RegionCardProps {
  title: string;
  description: string;
  sensors: number;
  delay: number;
}

function RegionCard({ title, description, sensors, delay }: RegionCardProps) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-sm"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.4, delay: delay * 0.1 }}
    >
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex items-center text-primary">
        <Wifi className="h-5 w-5 mr-2" />
        <span className="font-medium">{sensors}+ sensors</span>
      </div>
    </motion.div>
  );
}

export default function CoverageSection() {
  // Fetch regions from the API
  const { data: regions, isLoading, error } = useQuery({
    queryKey: ['/api/regions'],
    // On initial page load, if no regions exist in the database, use default regions
    initialData: [
      {
        id: 1,
        title: "Northern Region",
        description:
          "Coverage across the Himalayan seismic zone, including major cities like Delhi, Chandigarh, and Dehradun.",
        sensors: 450,
      },
      {
        id: 2,
        title: "Western Region",
        description:
          "Kutch and surrounding areas in Gujarat with extended coverage to Mumbai and parts of Maharashtra.",
        sensors: 350,
      },
      {
        id: 3,
        title: "Eastern Region",
        description:
          "Coverage across the northeastern states including Assam, Meghalaya, and parts of West Bengal.",
        sensors: 300,
      },
      {
        id: 4,
        title: "Central Region",
        description:
          "Narmada-Son lineament and surrounding areas with growing coverage in central India.",
        sensors: 200,
      },
    ],
  });

  return (
    <section id="coverage" className="bg-neutral py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Coverage Map</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our growing network of IoT sensors is strategically deployed across seismically active
            regions in India.
          </p>
        </motion.div>

        <motion.div
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src="https://images.unsplash.com/photo-1578983427937-26078ee3d9d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800"
            alt="Earthquake Early Warning Coverage Map of India"
            className="w-full h-auto rounded-xl"
          />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {isLoading ? (
            // Loading skeleton cards
            Array(4).fill(0).map((_, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-sm">
                <Skeleton className="h-7 w-3/4 mb-3" />
                <Skeleton className="h-20 w-full mb-4" />
                <div className="flex items-center">
                  <Skeleton className="h-5 w-5 mr-2" />
                  <Skeleton className="h-5 w-24" />
                </div>
              </div>
            ))
          ) : error ? (
            // Error message
            <div className="col-span-full text-center">
              <p className="text-red-500">Error loading regions. Please try again later.</p>
            </div>
          ) : (
            // Display regions
            regions.map((region, index) => (
              <RegionCard
                key={region.id || index}
                title={region.title}
                description={region.description}
                sensors={region.sensors}
                delay={index}
              />
            ))
          )}
        </div>

        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-semibold mb-6">Expansion Plans</h3>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto mb-8">
            We're continuously expanding our sensor network to increase coverage and reduce alert
            times. Our goal is to cover all seismically vulnerable regions across India by 2025.
          </p>
          <Button
            size="lg"
            className="bg-primary hover:bg-blue-600 text-white rounded-full px-8"
            onClick={() => scrollToElement("contact")}
          >
            Partner With Us
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
