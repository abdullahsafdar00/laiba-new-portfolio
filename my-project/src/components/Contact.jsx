import React, { useState } from "react";
import { Mail, Phone, Linkedin, Instagram, ArrowUpRight, User, Send } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const contactDetails = [
  {
    icon: Mail,
    label: "Email",
    value: "laibagfx421@gmail.com",
    href: "mailto:laibagfx421@gmail.com",
  },
  {
    icon: Phone,
    label: "Phone",
    value: "+92 322-9797462",
    href: "tel:+12345678901",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value: "linkedin.com/in/laiba",
    href: "https://linkedin.com/in/laiba", // Update as needed
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@laibagfx",
    href: "https://instagram.com/laibagfx", // Update as needed
  },
  {
    icon: ArrowUpRight,
    label: "Upwork",
    value: "upwork.com/freelancers/laibagfx",
    href: "https://upwork.com/freelancers/laibagfx", // Update as needed
  },
];

export default function Contact() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", content: "" });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success("Message sent successfully!");
        setFormData({ name: "", email: "", content: "" });
        navigate("/message-sent");
      } else {
        toast.error("Something went wrong. Please try again later.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server Error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="px-4 py-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 text-slate-800">
      {/* Contact Info Panel */}
      <motion.div
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 bg-white pl-10 pt-10 h-[500px] z-30 rounded-2xl shadow-xl hover:shadow-2xl transition"
      >
        <h2 className="text-3xl font-semibold mb-6">
          <span className="text-pink-500 italic">Contact</span> Information
        </h2>
        <ul className="space-y-6">
          {contactDetails.map((item, idx) => (
            <li key={idx} className="flex items-start gap-4 group">
              <item.icon className="w-6 h-6 text-pink-500 mt-1 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-sm font-semibold text-gray-600">{item.label}</p>
                <a href={item.href} target="_blank" rel="noopener noreferrer" className="text-base text-black hover:underline">
                  {item.value}
                </a>
              </div>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="w-full md:w-1/2 z-30 rounded-2xl p-10 shadow-xl hover:shadow-2xl transition"
      >
        <h1 className="text-4xl font-semibold py-4">
          Let’s <span className="text-pink-500 italic">Get In</span> Touch.
        </h1>
        <p className="text-gray-500 pb-10">
          Or just reach out manually at{" "}
          <a href="mailto:laibagfx421@gmail.com" className="text-pink-600 hover:underline">
            laibagfx421@gmail.com
          </a>
        </p>

        <div className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="font-medium block mb-1">Full Name</label>
            <div className="flex items-center border border-slate-300 rounded-full pl-3 h-12 focus-within:ring-2 focus-within:ring-pink-400 transition">
              <User className="w-4 h-4 text-slate-500" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 px-2 outline-none bg-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="font-medium block mb-1">Email Address</label>
            <div className="flex items-center border border-slate-300 rounded-full pl-3 h-12 focus-within:ring-2 focus-within:ring-pink-400 transition">
              <Mail className="w-4 h-4 text-slate-500" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 px-2 outline-none bg-transparent"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label htmlFor="content" className="font-medium block mb-1">Message</label>
            <textarea
              id="content"
              value={formData.content}
              onChange={handleChange}
              name="content"
              rows={4}
              className="w-full p-3 bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-pink-400 transition"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 mt-2 bg-transparent hover:bg-pink-500 text-pink-600 hover:text-white py-2.5 w-full rounded-full transition border-pink-600 border-2"
          >
            {loading ? "Sending..." : "Submit Form"}
            <Send className="w-4 h-4" />
          </button>
        </div>
      </motion.form>
    </div>
  );
}
