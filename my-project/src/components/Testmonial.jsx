import React, { useRef, useEffect } from 'react';

const testimonials = [
  {
    image: 'https://randomuser.me/api/portraits/women/1.jpg',
    name: 'Sophie Moore',
    handle: '@sophiem',
    date: 'Jan 2, 2025',
    review: 'Fantastic experience from start to finish. Highly recommend.',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/2.jpg',
    name: 'Liam Taylor',
    handle: '@liamt',
    date: 'Feb 10, 2025',
    review: 'Reliable and smooth process. Everything worked flawlessly.',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/3.jpg',
    name: 'Emma Williams',
    handle: '@emmawrites',
    date: 'Mar 15, 2025',
    review: 'Quick turnaround with great results. Will use again.',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/4.jpg',
    name: 'Noah Johnson',
    handle: '@noahj',
    date: 'Apr 22, 2025',
    review: 'Best decision we made this year. Great service.',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/5.jpg',
    name: 'Ava Brown',
    handle: '@avab',
    date: 'May 1, 2025',
    review: 'The process was effortless. Loved the outcome!',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/6.jpg',
    name: 'Elijah Davis',
    handle: '@elijahd',
    date: 'Jun 3, 2025',
    review: 'Exceeded all expectations. A+ support and results.',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/7.jpg',
    name: 'Isabella Garcia',
    handle: '@isabellag',
    date: 'Jul 9, 2025',
    review: 'Their team made it super easy and enjoyable!',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/8.jpg',
    name: 'James Martinez',
    handle: '@jamesm',
    date: 'Aug 18, 2025',
    review: 'High quality and timely delivery. Perfect.',
  },
  {
    image: 'https://randomuser.me/api/portraits/women/9.jpg',
    name: 'Mia Rodriguez',
    handle: '@miar',
    date: 'Sep 5, 2025',
    review: 'Professional and responsive from start to finish.',
  },
  {
    image: 'https://randomuser.me/api/portraits/men/10.jpg',
    name: 'William Hernandez',
    handle: '@willh',
    date: 'Oct 27, 2025',
    review: 'They nailed it. Truly impressive work!',
  },
];

const TestimonialCard = ({ testimonial }) => (
  <div className="min-w-[260px] max-w-xs sm:max-w-sm md:max-w-sm lg:max-w-xs bg-white rounded-xl shadow-md p-4 mx-3 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center gap-3 mb-3">
      <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover" />
      <div>
        <p className="font-semibold">{testimonial.name}</p>
        <p className="text-sm text-gray-500">{testimonial.handle}</p>
      </div>
    </div>
    <p className="text-gray-700 text-sm mb-4">{testimonial.review}</p>
    <div className="flex justify-between text-xs text-gray-400">
      <span>Posted on</span>
      <span>{testimonial.date}</span>
    </div>
  </div>
);

const Testimonial = () => {
  const topRef = useRef();
  const bottomRef = useRef();

  const updateDuration = (ref) => {
    const el = ref.current;
    if (el) {
      const totalWidth = el.scrollWidth / 2;
      const speed = 80; // pixels per second
      const duration = totalWidth / speed;
      el.style.setProperty('--duration', `${duration}s`);
    }
  };

  useEffect(() => {
    updateDuration(topRef);
    updateDuration(bottomRef);
    const onResize = () => {
      updateDuration(topRef);
      updateDuration(bottomRef);
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // Video ref + autoplay when visible (improves performance on mobile)
  const videoRef = useRef(null);

  useEffect(() => {
    const videoEl = videoRef.current;
    if (!videoEl || typeof IntersectionObserver === 'undefined') return;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // try to play; modern browsers require muted for autoplay
            const playPromise = videoEl.play();
            if (playPromise && typeof playPromise.then === 'function') {
              playPromise.catch(() => {
                // ignore play errors (will stay paused, user can press play)
              });
            }
          } else {
            videoEl.pause();
          }
        });
      },
      { threshold: 0.5 }
    );

    io.observe(videoEl);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <style>{`
        .marquee-track {
          display: flex;
          width: max-content;
          animation: scroll-left var(--duration, 30s) linear infinite;
        }
        .marquee-track.reverse {
          animation: scroll-right var(--duration, 30s) linear infinite;
        }
        @keyframes scroll-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes scroll-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }
      `}</style>

      <section className="bg-white py-16 overflow-hidden md:w-6xl md:mx-auto">
        <div className="text-center mb-12 px-4">
          <h2 className="text-3xl sm:text-4xl font-semibold text-pink-500 italic"> <span className='text-slate-800'>What Our</span> Clients <span className='text-slate-800'>Say</span></h2>
          <p className="mt-2 text-gray-600 text-sm sm:text-base max-w-2xl mx-auto">
            Hear directly from our satisfied clients who’ve experienced our service firsthand.
          </p>
        </div>

        {/* Top Row */}
        <div className="relative overflow-hidden">
          <div ref={topRef} className="marquee-track pb-5">
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={`top-${i}`} testimonial={t} />
            ))}
          </div>
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-50 to-transparent z-50 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-50 to-transparent z-50 pointer-events-none" />
        </div>

        {/* Bottom Row */}
        <div className="relative overflow-hidden mt-6">
          <div ref={bottomRef} className="marquee-track reverse">
            {[...testimonials, ...testimonials].map((t, i) => (
              <TestimonialCard key={`bottom-${i}`} testimonial={t} />
            ))}
          </div>
          <div className="absolute left-0 top-0 h-full w-24 bg-gradient-to-r from-gray-50 to-transparent z-50 pointer-events-none" />
          <div className="absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-gray-50 to-transparent z-50 pointer-events-none" />
        </div>

        {/* Testimonial video */}
        <div className="mt-8 px-4 w-full flex justify-center">
          <div className="w-full bg-[#D5B9A4] shadow-xs rounded-xl">
            <video
              ref={videoRef}
              src="/testinomailvideo.mp4"
              className="w-full h-[500px] object-contain block"
              playsInline
              muted
              loop
              preload="metadata"
              controls
              aria-label="Testimonial video from a client"
            />
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
