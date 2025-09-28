import React, {useState, useEffect, useRef} from "react";

const brandIcons = [
  { src: '/1.png', alt: 'Brand 1' },
  { src: '/2.png', alt: 'Brand 2' },
  { src: '/3.png', alt: 'Brand 3' },
  { src: '/4.png', alt: 'Brand 4' },
  { src: '/5.png', alt: 'Brand 5' },
  { src: '/6.png', alt: 'Brand 6' },
  { src: '/7.png', alt: 'Brand 7' },
  { src: '/8.png', alt: 'Brand 8' },
];

const Hero = () => {

  const trackRef = useRef(null);
  
    useEffect(() => {
      const track = trackRef.current;
      if (track) {
        track.innerHTML = ""; // Clear previous content
        [...brandIcons, ...brandIcons].forEach((icon) => {
          const img = document.createElement("img");
          img.src = icon.src;
          img.alt = icon.alt;
          img.className = "h-40 w-auto mx-4 sm:h-24 md:h-28 lg:h-32 transition-transform hover:scale-110";
          img.draggable = false;
          track.appendChild(img);
        });
  
        // Clone the images for seamless loop
        [...track.children].forEach(img => {
          track.appendChild(img.cloneNode(true));
        });
      }
    }, []);

    return (
        <>
            <div className="min-h-screen pb-20">
                {/* Hero Section */}
                <div className="relative flex flex-col my-10 items-center justify-center text-sm px-4 md:px-16 lg:px-24 xl:px-40 text-black">
                    <div className="absolute top-28 xl:top-10 -z-10 left-1/4 size-72 sm:size-96 xl:size-120 2xl:size-132 bg-pink-300 blur-[100px] opacity-30"></div>

                    {/* Avatars + Stars */}
                    <div className="flex items-center mt-24">
                        <div className="flex -space-x-3 pr-3">
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[1]" />
                            <img src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=200" alt="user1" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-2" />
                            <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200" alt="user2" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[3]" />
                            <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=200" alt="user3" className="size-8 object-cover rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[4]" />
                            <img src="https://randomuser.me/api/portraits/men/75.jpg" alt="user5" className="size-8 rounded-full border-2 border-white hover:-translate-y-0.5 transition z-[5]" />
                        </div>

                        <div>
                            <div className="flex ">
                                {Array(5).fill(0).map((_, i) => (
                                    <svg key={i} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-star text-transparent fill-pink-600" aria-hidden="true"><path d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"></path></svg>
                                ))}
                            </div>
                            <p className="text-sm text-gray-700">
                                Worked for 100+ clients
                            </p>
                        </div>
                    </div>

                    {/* Headline + CTA */}
                    <h1 className="text-5xl md:text-6xl font-semibold max-w-5xl text-center mt-4 md:leading-[70px]">
                        Boost Your Sales On Amazon<span className=" bg-gradient-to-r from-pink-700 to-pink-600 bg-clip-text text-transparent text-nowrap"> With optimized visuals.</span>
                    </h1>

                    <p className="max-w-md text-center text-base my-7">Helping Brands to Grow on Amazon with Optimized Visual Content | Amazon Design Expert</p>

                    {/* CTA Buttons */}
                    <div className="flex items-center gap-4 ">
                        <a href='/' className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-9 h-12 m-1 ring-offset-2 ring-1 ring-pink-400 flex items-center transition-colors">
                            See my Work
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right ml-1 size-4" aria-hidden="true"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
                        </a>
                        <button className="flex items-center gap-2 border border-slate-400 hover:bg-pink-50 transition rounded-full px-7 h-12 text-slate-700">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-video size-5" aria-hidden="true"><path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5"></path><rect x="2" y="6" width="14" height="12" rx="2"></rect></svg>
                            <span>Let's Discuss Your Project</span>
                        </button>
                    </div>

                    <p className="py-6 text-slate-600 mt-14">Trusting by leading brands, including</p>

                     <div className="overflow-hidden w-full relative max-w-6xl mx-auto select-none">
          <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
          <div
            ref={trackRef}
            className="marquee-track flex items-center min-w-[200%] will-change-transform"
          />
          <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
        </div>
                </div>
            </div>
            <style>
                {`
                    @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');

                    * {
                        font-family: 'Poppins', sans-serif;
                    }
                          .marquee-track {
          animation: marqueeScroll 20s linear infinite;
          display: flex;
          gap: 1rem;
        }
        
        @media (max-width: 768px) {
          .marquee-track {
            animation-duration: 18s;
            gap: 0.75rem;
          }
        }
        
        @keyframes marqueeScroll {
          from {
            transform: translateX(0%);
          }
          to {
            transform: translateX(-50%);
          }
        }
                `}
            </style>
        </>
    );
}

export default Hero;