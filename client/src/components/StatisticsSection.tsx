import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";
import useIntersectionObserver from "@/hooks/useIntersectionObserver";
import useCounter from "@/hooks/useCounter";
import { useRef } from "react";

interface StatProps {
  value: number;
  label: string;
  suffix?: string;
  delay?: number;
}

function StatCard({ value, label, suffix = "", delay = 0 }: StatProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useIntersectionObserver(ref, { threshold: 0.1 });
  const count = useCounter(value, 2, isInView, delay);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay * 0.1 }}
      className="bg-white p-8 rounded-2xl shadow-sm transition-transform duration-300 hover:-translate-y-1"
    >
      <div className="text-5xl font-semibold text-primary mb-4">
        {count}
        {suffix}
      </div>
      <p className="text-lg">{label}</p>
    </motion.div>
  );
}

export default function StatisticsSection() {
  return (
    <section className="bg-neutral py-16 md:py-24">
      <div className="container mx-auto px-6">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-semibold mb-4">Making a Difference</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Our advanced warning system provides critical time to take protective action before
            earthquake waves arrive.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <StatCard value={30} label="Seconds of advance warning" delay={0} />
          <StatCard value={1000} label="Sensors deployed across India" suffix="+" delay={1} />
          <StatCard value={99.8} label="Detection accuracy" suffix="%" delay={2} />
          <StatCard value={12} label="States covered" delay={3} />
        </div>
      </div>
    </section>
  );
}
