import { motion } from "framer-motion";
import { Check, SatelliteDish, Zap, Bell } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function TechnologySection() {
  const features = [
    "High-precision accelerometers with nano-g sensitivity",
    "Battery backup with solar charging capabilities",
    "Low-power wide-area network (LPWAN) connectivity",
    "Machine learning algorithms for false-positive reduction",
  ];

  return (
    <section id="technology" className="bg-white py-20 md:py-28">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Our Technology</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Learn how our IoT earthquake early warning system works to provide critical advance
            notification.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <h3 className="text-2xl font-semibold mb-4">Network of IoT Sensors</h3>
            <p className="text-lg text-gray-600 mb-6">
              Our proprietary IoT sensors form a dense network across seismically active regions.
              These highly sensitive devices can detect P-waves - the first, faster-moving but less
              damaging seismic waves that precede the more destructive S-waves.
            </p>
            <div className="bg-neutral p-6 rounded-xl mb-6">
              <h4 className="text-xl font-medium mb-2">Key Features</h4>
              <ul className="text-gray-600 space-y-2">
                {features.map((feature, index) => (
                  <li key={index} className="flex items-start">
                    <Check className="text-primary h-5 w-5 mt-1 mr-3 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src="https://images.unsplash.com/photo-1580584126903-c17d41830450?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
              alt="IoT Earthquake Sensor"
              className="w-full h-auto rounded-2xl shadow-lg"
            />
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <TechCard
            icon={<SatelliteDish className="text-primary h-10 w-10" />}
            title="Detection"
            description="Sensors detect initial P-waves from earthquakes and instantly transmit data to our processing centers."
            delay={0}
          />
          <TechCard
            icon={<Zap className="text-primary h-10 w-10" />}
            title="Processing"
            description="Our AI algorithms verify the event and calculate magnitude, location, and estimated arrival times within milliseconds."
            delay={0.1}
          />
          <TechCard
            icon={<Bell className="text-primary h-10 w-10" />}
            title="Alert Distribution"
            description="Warnings are instantly sent to mobile devices, infrastructure systems, and emergency services."
            delay={0.2}
          />
        </div>

        <motion.div
          className="bg-white border border-neutral rounded-2xl p-8 md:p-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-2/3 md:pr-8 mb-8 md:mb-0">
              <h3 className="text-2xl font-semibold mb-4">How Much Time Do You Get?</h3>
              <p className="text-lg text-gray-600 mb-6">
                The time between receiving an alert and feeling the earthquake depends on your
                distance from the epicenter. Our system typically provides:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex items-center">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <span className="font-semibold">5-10</span>
                  </div>
                  <p className="text-gray-600">Seconds if you're 10-20km away</p>
                </div>
                <div className="flex items-center">
                  <div className="bg-primary text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
                    <span className="font-semibold">20+</span>
                  </div>
                  <p className="text-gray-600">Seconds if you're 40km+ away</p>
                </div>
              </div>
              <p className="text-lg text-gray-600 mt-6">
                Even a few seconds of warning can be enough time to take protective action, such as
                finding cover or shutting down critical systems.
              </p>
            </div>
            <div className="md:w-1/3">
              <img
                src="https://pixabay.com/get/g0d77f307bc21ac55d5c65142e5c856dadfb80f0744dc9ec37509c81ba71d3f6d5e4f34f24e23fcd7eb2ece7e3d4ca23c251d7c085039af279255304334a21b74_1280.jpg"
                alt="Earthquake wave propagation"
                className="w-full h-auto rounded-xl shadow-md"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

interface TechCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

function TechCard({ icon, title, description, delay }: TechCardProps) {
  return (
    <motion.div
      className="bg-neutral p-8 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="text-primary text-5xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}
