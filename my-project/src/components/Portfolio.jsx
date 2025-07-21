import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, useTexture } from '@react-three/drei';
import * as THREE from 'three';
import { Link } from 'react-router-dom';

const IMAGE_URLS = [
  'https://i.imgur.com/qn7TzJW.jpeg',
  'https://i.imgur.com/EuZP7xS.jpeg',
  'https://i.imgur.com/6WJF6uM.jpeg',
];

const ImageSegment = ({ texture, angle, radius, gap, segmentAngle }) => {
  const geometry = new THREE.CylinderGeometry(
    radius,
    radius,
    4,
    64,
    5,
    true,
    angle + gap / 3,
    segmentAngle - gap
  );

  return (
    <mesh>
      <primitive object={geometry} attach="geometry" />
      <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
    </mesh>
  );
};

const StaticCylinder = ({ rotation }) => {
  const groupRef = useRef();
  const textures = useTexture(IMAGE_URLS);
  const radius = 3.5;
  const gap = 0.02;
  const segmentAngle = (2 * Math.PI) / textures.length;

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation.current.y;
      groupRef.current.rotation.x = rotation.current.x;
    }
  });

  return (
    <group ref={groupRef}>
      {textures.map((texture, i) => {
        const angle = i * segmentAngle;
        return (
          <ImageSegment
            key={i}
            texture={texture}
            angle={angle}
            radius={radius}
            gap={gap}
            segmentAngle={segmentAngle}
          />
        );
      })}
    </group>
  );
};

const Portfolio = () => {
  const rotation = useRef({ x: 0, y: 0 });
  const dragOffset = useRef({ x: 0, y: 0 });
  const lastPos = useRef(null);
  const [isMobile, setIsMobile] = useState(false);
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const scrollVal = window.scrollY || window.pageYOffset;
      rotation.current.y = scrollVal * 0.002 + dragOffset.current.y;
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e) => {
      lastPos.current = {
        x: e.clientX || e.touches?.[0]?.clientX,
        y: e.clientY || e.touches?.[0]?.clientY,
      };
      setShowHint(false); // hide on user interaction
    };

    const handlePointerMove = (e) => {
      if (!lastPos.current) return;

      const current = {
        x: e.clientX || e.touches?.[0]?.clientX,
        y: e.clientY || e.touches?.[0]?.clientY,
      };

      const deltaX = current.x - lastPos.current.x;
      const deltaY = current.y - lastPos.current.y;

      dragOffset.current.y += deltaX * 0.005;
      dragOffset.current.x += deltaY * 0.005;

      dragOffset.current.x = Math.max(
        -Math.PI / 4,
        Math.min(Math.PI / 4, dragOffset.current.x)
      );

      rotation.current.y = window.scrollY * 0.002 + dragOffset.current.y;
      rotation.current.x = dragOffset.current.x;

      lastPos.current = current;
    };

    const clear = () => (lastPos.current = null);

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mousemove', handlePointerMove);
    window.addEventListener('mouseup', clear);

    window.addEventListener('touchstart', handlePointerDown, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('touchend', clear);

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('mouseup', clear);

      window.removeEventListener('touchstart', handlePointerDown);
      window.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('touchend', clear);
    };
  }, []);

  // Auto hide after 6 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowHint(false), 6000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="w-full min-h-screen bg-white flex flex-col items-center justify-start pt-8 relative mb-32">
      <h2 className="text-3xl sm:text-4xl font-bold text-center text-pink-500">
        Designs
      </h2>
      <p className="text-sm sm:text-base text-slate-500 text-center mb-6 max-w-xl mx-auto px-4">
        A 3D visual spotlight on our people — clean, modern, scroll or swipe in any direction.
      </p>

      <div className="w-full h-[90vh] sm:h-[90vh] px-2 sm:px-10 relative">
        <Canvas camera={{ position: [0, 5, isMobile ? 10 : 8], fov: isMobile ? 55 : 50 }}>
          <ambientLight intensity={0.6}/>
          <directionalLight position={[5, 5, 5]} />
          <StaticCylinder rotation={rotation}  />
          <OrbitControls
            enableZoom={false}
            enableRotate={false}
            enablePan={false}
          />
        </Canvas>
        <Link to='/designs' className='flex justify-center text-center items-center mt-20'>
          <button className='border-2 border-pink-500 p-4 rounded-4xl text-pink-500 font-bold active:scale-90'>See More Designs</button>
        </Link>

        {/* SWIPE HINT OVERLAY */}
        {showHint && (
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none animate-fade-in z-10">
            <div className="flex gap-8 mb-2 opacity-70">
              <div className="animate-bounce-left text-4xl text-slate-400">⬅️</div>
              <div className="animate-bounce-right text-4xl text-slate-400">➡️</div>
            </div>
            <p className="text-center text-sm text-slate-500">Swipe or drag to rotate</p>
          </div>
        )}
      </div>
    </section>
  
  );
};

export default Portfolio;
