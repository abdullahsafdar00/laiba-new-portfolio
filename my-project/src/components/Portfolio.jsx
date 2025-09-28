import React from 'react'
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import projects from '../data/projects';

const Portfolio = ({ preview = false }) => {

  const displayedProjects = preview ? projects.slice(0, 4) : projects;

  return (
  <div
      className={`w-full min-h-screen px-4 sm:px-6 lg:px-8 py-16 transition-colors duration-500 overflow-x-hidden`}
    >
     <motion.div
  initial={{ opacity: 0, y: 30 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true }}
  transition={{ duration: 0.6 }}
  className="text-center mb-20"
>
  <h2 className="text-4xl sm:text-5xl font-semibold bg-pink-600 bg-clip-text text-transparent">
    My Creative Projects
  </h2>
  <p className="mt-4 text-black text-lg max-w-2xl mx-auto">
    A selection of my favorite design work — blending creativity with strategy.
  </p>
</motion.div>


      {/* Projects List */}
      <div className="space-y-20 max-w-7xl mx-auto">
        {displayedProjects.map((project, idx) => {
          const isEven = idx % 2 === 1;
          return (
            <motion.div
              key={idx}
              className={`flex flex-col lg:flex-row items-center gap-10 ${
                isEven ? "lg:flex-row-reverse" : ""
              }`}
              initial={{ opacity: 0, x: isEven ? 50 : -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.05 }}
              viewport={{ once: false }}
            >
              {/* Text Content */}
              <div className="flex-1">
                <h3
                  className={`text-2xl font-bold mb-4 text-pink-600`}
                >
                  {project.title}
                </h3>
                <p
                  className={`mb-4 text-pink-700`}
                >
                  {project.description}
                </p>

                {/* Skills */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.skills.map((skill, i) => (
                    <span
                      key={i}
                      className={`px-3 py-1 text-sm rounded-full border
                        border-pink-600  bg-pink-100 text-pink-700 font-medium shadow-sm
                         
                      `}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

                {/* View Button */}
                <Link
                  to={`/project/${project.slug}`}
                  className={`inline-flex items-center gap-2 px-5 py-2 font-medium rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-all duration-300`}
                >
                  View Project
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
  </svg>
                </Link>
              </div>

              {/* Image */}
              <div className="flex-1">
                <img
                  src={project.img}
                  alt={project.title}
                  className="h-72 w-full object-cover rounded-xl shadow-lg"
                />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Show More button (only in preview mode) */}
      {preview && (
        <div className="text-center mt-12">
          <Link
            to="/designs"
            className={`inline-block px-6 py-3 font-semibold rounded-lg border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white transition-all duration-300`}
          >
            Show More
          </Link>
        </div>
      )}

      {/* Divider */}
      {!preview && (
        <span
          className={`h-0.5 w-full block mt-16 transition-colors duration-500 `}
        ></span>
      )}
    </div>
  )
}

export default Portfolio