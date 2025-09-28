import React from "react";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function About() {
  return (
    <section className="relative px-6 sm:px-12 lg:px-24 py-20 bg-gradient-to-b from-white via-pink-50/40 to-white text-slate-800 overflow-hidden">
      
    

      {/* Main Heading */}
      <motion.div 
        className="text-center mb-16 relative z-10"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-pink-600 mb-3">
          <Sparkles className="w-4 h-4" /> Who I Am
        </span>
        <h2 className="text-4xl sm:text-5xl flex flex-col md:text-6xl font-semibold leading-tight">
          Crafting Bold Visual Stories <span className="bg-pink-600 bg-clip-text text-transparent">That Inspire & Connect</span>
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          Transforming brands with stunning visuals & intuitive user interfaces that leave a lasting impression.
        </p>
      </motion.div>

      {/* Flex Layout (70/30) */}
      <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 relative z-10">
        {/* Left - Text (70%) */}
        <motion.div 
          className="w-full lg:w-[70%] space-y-6"
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h3 className="text-3xl sm:text-4xl font-semibold text-slate-900 leading-snug">
            Turning <span className="text-pink-600">Ideas</span> Into Seamless <br/>{" "}
            <span className="bg-pink-600 bg-clip-text text-transparent">User Journeys</span>
          </h3>
          
          <p className="text-gray-600 text-lg leading-relaxed">
            Hi! I’m <span className="font-semibold text-xl text-pink-500">Laiba</span>, a passionate Graphic Designer who transforms ideas into compelling visuals. From branding and packaging to digital campaigns and social media content, I help businesses create designs that not only look stunning but also communicate their message effectively
          </p>

      
          

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="#contact" 
              className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-full text-white bg-pink-600 hover:opacity-90 transition-all duration-300 shadow-lg"
            >
              Let’s Collaborate
            </a>
            <a 
              href="/designs" 
              className="inline-flex items-center justify-center px-6 py-3 border-2 border-pink-500 text-base font-medium rounded-full text-pink-600 hover:bg-pink-50 transition-colors duration-300"
            >
              View My Work
            </a>
          </div>
        </motion.div>

        {/* Right - Image (30%) */}
        <motion.div 
          className="w-full lg:w-[40%]"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <img
            src="/laiba.jpg"
            alt="Laiba - Graphic Designer"
          />
        </motion.div>
      </div>
      <style>
        {`
         @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
        `}
      </style>
    </section>
  );
}
