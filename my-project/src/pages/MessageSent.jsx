import { motion } from "framer-motion";
import { CheckCircle } from "lucide-react";

export default function MessageSent() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center min-h-screen px-4 text-center bg-white"
    >
      <CheckCircle className="w-16 h-16 text-pink-500 mb-6" strokeWidth={1.5} />
      
      <h1 className="text-3xl md:text-4xl font-bold text-slate-800">
        Your message has been sent!
      </h1>

      <p className="mt-4 text-gray-500 max-w-md">
        Thank you for reaching out. We’ll get back to you as soon as possible — usually within 24 hours.
      </p>

      <a
        href="/"
        className="mt-8 inline-block rounded-full bg-pink-600 text-white px-6 py-2 text-sm font-medium hover:bg-pink-700 transition"
      >
        Back to Home
      </a>
    </motion.div>
  );
}
