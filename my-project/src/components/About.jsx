
import { SiLinkedin, SiInstagram, SiFacebook, SiUpwork, SiFiverr, SiFreelancer } from "react-icons/si";

const brandIcons = [
  { icon: SiLinkedin, name: "LinkedIn" },
  { icon: SiInstagram, name: "Instagram" },
  { icon: SiFacebook, name: "Facebook" },
  { icon: SiUpwork, name: "Upwork" },
  { icon: SiFiverr, name: "Fiverr" },
  { icon: SiFreelancer, name: "Freelancer" },
];

export default function About() {
  // Repeat icons 4 times for a seamless loop
  const icons = Array(4).fill(brandIcons).flat();

  return (
    <section className="text-center px-4 py-20 bg-white text-slate-800">
      <h2 className="text-3xl md:text-5xl font-bold mt-4 leading-tight">
        Brands <span className="text-pink-500 italic">I have</span> worked with.
      </h2>
      <p className="max-w-xl mx-auto mt-6 text-gray-500 text-base md:text-lg">
        I am passionate about delivering fast, beautiful, and reusable solutions that meet modern design needs. I have worked for my clients on different platforms.
      </p>
      {/* Logo Marquee */}
      <div className="overflow-hidden w-full relative max-w-6xl mx-auto select-none mt-16">
        <div className="absolute left-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-r from-white to-transparent" />
        <div className="marquee-inner flex items-center min-w-[400%]">
          {icons.map(({ icon: Icon, name }, idx) => (
            <span className="mx-8 inline-block" key={name + idx}>
              <Icon size={48} color="#E75480" title={name} />{name}
            </span>
          ))}
        </div>
        <div className="absolute right-0 top-0 h-full w-20 z-10 pointer-events-none bg-gradient-to-l from-white to-transparent" />
      </div>
      {/* Animation Styles */}
      <style>{`
        .marquee-inner {
          animation: marqueeScroll 18s linear infinite;
        }
        @keyframes marqueeScroll {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-25%);
          }
        }
      `}</style>
    </section>
  );
}
