import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { scrollToElement } from "@/lib/utils";

export default function HeroSection() {
  return (
    <section id="home" className="pt-28 pb-20 md:pt-36 md:pb-24">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center">
        <motion.div
          className="md:w-1/2 mb-12 md:mb-0 md:pr-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-6">
            India's First Mass IoT Earthquake Early Warning System
          </h1>
          <p className="text-lg md:text-xl text-gray-600 mb-8">
            Saving lives through revolutionary technology that provides critical seconds of advance
            warning before earthquake impact.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-blue-600 text-white rounded-full px-8"
              onClick={() => scrollToElement("technology")}
            >
              Learn How It Works
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-neutral hover:bg-gray-200 text-secondary rounded-full px-8"
              onClick={() => scrollToElement("contact")}
            >
              Contact Us
            </Button>
          </div>
        </motion.div>
        <motion.div
          className="md:w-1/2"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <img
            src="https://pixabay.com/get/gdd47624e4e0de6235f3a7a2a04521d967cef0b91eb28f109c0ecb38deb586a20147639eeabed01bbd1ca28a7a5fc0378723d35083230bbed79fed042de3dfced_1280.jpg"
            alt="IoT Earthquake Early Warning System"
            className="w-full h-auto rounded-2xl shadow-lg object-cover"
          />
        </motion.div>
      </div>
    </section>
  );
}
