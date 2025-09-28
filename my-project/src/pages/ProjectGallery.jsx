import React, { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import manifest from '../data/projectImages.json';
import projects from '../data/projects';

const ProjectGallery = () => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const images = useMemo(() => manifest[slug] || [], [slug]);

  const project = useMemo(() => projects.find((p) => p.slug === slug) || null, [slug]);
  const title = project ? project.title : (slug || 'Project');

  return (
    <section className="min-h-screen bg-white pt-16 px-4 sm:px-10">
      <button onClick={() => navigate(-1)} className="mb-6 text-pink-500 hover:underline">&larr; Back</button>
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-pink-500 mb-2">
        {title}
      </h2>

      <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3">
        {images.length > 0 ? (
          images.map((src, idx) => (
            <div key={idx} className="overflow-hidden rounded-xl shadow-md aspect-[1/1]">
              <img src={src} alt={`${title} - ${idx + 1}`} className="w-full h-full object-cover object-center" width={1500} height={1500} />
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-slate-500">No images found for this project. Make sure there's a folder under <code>public/projects/{slug}</code> and run <code>npm run generate-manifest</code>.</p>
        )}
      </div>
    </section>
  );
};

export default ProjectGallery;
