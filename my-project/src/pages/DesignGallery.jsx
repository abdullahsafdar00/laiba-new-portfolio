// src/pages/DesignGallery.jsx
import React from 'react';
import Portfolio from '../components/Portfolio';

// Render the full portfolio (all projects) when navigating to /designs
const DesignGallery = () => {
  return (
    <div className="min-h-screen bg-white pt-16 px-4 sm:px-10">
      <Portfolio preview={false} />
    </div>
  );
};

export default DesignGallery;
