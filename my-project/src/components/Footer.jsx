import React from "react";
import { Github, Twitter, Linkedin, Mail, Instagram } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white text-sm text-slate-600">
      <div className="max-w-7xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1: Brand */}
        <div>
          <h2 className="text-xl font-bold text-slate-800 mb-2">Laiba S.</h2>
          <p className="text-slate-500 max-w-xs">
           Helping Brands to Grow on Amazon with Optimized Visual Content | Amazon Design Expert
          </p>
        </div>

        {/* Column 2: Navigation */}
        <div className="flex flex-col gap-2">
          <p className="font-medium text-slate-700">Navigation</p>
          <a href="/about" className="hover:text-pink-600 transition">About</a>
          <a href="/contact" className="hover:text-pink-600 transition">Contact</a>
          <a href="/components" className="hover:text-pink-600 transition">Pricing</a>
          <a href="/book-consultation" className="hover:text-pink-600 transition">Book a Consultation</a>
          <a href="/contact" className="hover:text-pink-600 transition">Services</a>
          <a href="/components" className="hover:text-pink-600 transition">Portfolio</a>
        </div>

        {/* Column 3: Contact & Socials */}
        <div className="flex flex-col gap-3">
          <p className="font-medium text-slate-700">Contact</p>
          <a href="mailto:hello@prebuiltui.com" className="hover:text-pink-600 transition">
            laibagfx421@gmail.com
          </a>
          <div className="flex gap-4 mt-2">
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-pink-600 transition"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-pink-600 transition"
            >
              <Instagram className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-pink-600 transition"
            >
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="text-center border-t border-slate-200 py-4 text-xs text-slate-400">
        © {new Date().getFullYear()} Laiba S. All rights reserved.
      </div>
    </footer>
  );
}
