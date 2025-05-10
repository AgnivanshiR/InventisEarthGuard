import { motion } from "framer-motion";
import { Users, Lightbulb } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="py-20 md:py-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            className="md:w-1/2 md:pr-12 mb-12 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="Inventis Labs Team"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-semibold mb-6">About Inventis Labs</h2>
            <p className="text-lg text-gray-600 mb-6">
              Inventis Labs is a pioneering technology company focused on developing innovative IoT
              solutions that address critical safety challenges in India and beyond.
            </p>
            <p className="text-lg text-gray-600 mb-6">
              Our team of experts combines seismology knowledge with cutting-edge IoT technology to
              create India's first mass earthquake early warning system.
            </p>
            <p className="text-lg text-gray-600 mb-8">
              Founded in 2018, we're on a mission to use technology to save lives and reduce the
              impact of natural disasters across the region.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <div className="flex items-center">
                <Users className="text-primary h-10 w-10 mr-4" />
                <div>
                  <h3 className="text-xl font-medium">Expert Team</h3>
                  <p className="text-gray-600">Engineers & Scientists</p>
                </div>
              </div>
              <div className="flex items-center">
                <Lightbulb className="text-primary h-10 w-10 mr-4" />
                <div>
                  <h3 className="text-xl font-medium">Innovation</h3>
                  <p className="text-gray-600">Patented Technology</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
