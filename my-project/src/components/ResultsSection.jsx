import React from 'react';
import { Briefcase, Users, TrendingUp, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
// Single metric — animates each time it comes into view
export const ResultMetric = ({ label, end, suffix = '', Icon }) => {
  const ref = React.useRef(null);
  const rafRef = React.useRef(null);
  const [val, setVal] = React.useState(0);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const duration = 1400;

    const run = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      const startTime = performance.now();
      const step = (now) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(end * eased);
        setVal(current);
        if (progress < 1) rafRef.current = requestAnimationFrame(step);
      };
      rafRef.current = requestAnimationFrame(step);
    };

    const reset = () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      setVal(0);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) run();
          else reset();
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => {
      observer.disconnect();
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [end]);

  return (
    <div ref={ref} className="bg-white rounded-xl p-6 text-center shadow-sm">
      {Icon && (
        <div className={`w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center bg-gray-50`}>
          <Icon className="w-6 h-6 text-current" />
        </div>
      )}
      <div className="text-3xl md:text-4xl font-semibold text-pink-600">{val}{suffix}</div>
      <div className="text-sm text-gray-600 mt-2">{label}</div>
    </div>
  );
};

const ResultsSection = () => {
  return (
    <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
     className="mb-10">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-semibold text-black">The Results</h2>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto">Real outcomes from projects — metrics that show the value my designs bring.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
        <ResultMetric Icon={Briefcase}  label="Projects Delivered" end={370} suffix="+" />
        <ResultMetric Icon={Users}  label="Happy Clients" end={210} suffix="+" />
        <ResultMetric Icon={TrendingUp} label="Avg. Conversion Uplift" end={47} suffix="%" />
        <ResultMetric Icon={Clock}  label="Avg. Delivery Time (days)" end={7} suffix="d" />
      </div>

    </motion.div>
  );
};

export default ResultsSection;
