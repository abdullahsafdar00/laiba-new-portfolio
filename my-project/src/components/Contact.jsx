import React, { useState } from "react";
import {
  Mail,
  Phone,
  Linkedin,
  Instagram,
  ArrowUpRight,
  User,
  Send,
} from "lucide-react";
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
    href: "tel:+923229797462",
  },
  {
    icon: Linkedin,
    label: "LinkedIn",
    value:
      "linkedin.com/in/laiba-safdar-amazon-design-expert-graphic-designer",
    href: "https://linkedin.com/in/laiba-safdar-amazon-design-expert-graphic-designer",
  },
  {
    icon: Instagram,
    label: "Instagram",
    value: "@laibagfx",
    href: "https://instagram.com/laibagfx",
  },
  {
    icon: ArrowUpRight,
    label: "Upwork",
    value: "upwork.com/freelancers/laibagfx",
    href: "https://upwork.com/freelancers/laibagfx",
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
    <div className="px-4 sm:px-6 lg:px-12 py-16 sm:py-20 max-w-7xl mx-auto flex flex-col md:flex-row gap-8 md:gap-12 text-slate-800">
      {/* Contact Info Panel */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{once: false}}
        className="w-full md:w-1/2 bg-white p-6 sm:p-8 lg:p-10 rounded-2xl hover:shadow-2xl shadow-lg transition"
      >
        <h2 className="text-2xl sm:text-3xl font-semibold mb-6">
          <span className="text-pink-500">Contact</span> Information
        </h2>
        <ul className="space-y-5 sm:space-y-6">
          {contactDetails.map((item, idx) => (
            <motion.li
                initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
             key={idx} className="flex items-start gap-3 sm:gap-4 group">
              <item.icon className="w-5 h-5 sm:w-6 sm:h-6 text-pink-500 mt-1 group-hover:scale-110 transition-transform" />
              <div>
                <p className="text-sm sm:text-base font-semibold text-gray-600">
                  {item.label}
                </p>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm sm:text-base text-black hover:underline break-words"
                >
                  {item.value}
                </a>
              </div>
            </motion.li>
          ))}
        </ul>
        <p className="mt-6 text-sm sm:text-base italic text-black">
          Fill the form and we’ll connect within 24 hours. If urgent, message me
          on{" "}
          <a
            href="https://linkedin.com/in/laiba-safdar-amazon-design-expert-graphic-designer"
            className="text-pink-600 hover:underline"
            target="_blank"
          >
            LinkedIn
          </a>
          .
        </p>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        viewport={{once: false}}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-1/2 rounded-2xl p-6 sm:p-8 lg:p-10 hover:shadow-xl border border-pink-600 transition"
      >
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold py-2 sm:py-4">
          Let’s <span className="text-pink-500">Get In</span> Touch.
        </h1>
        <p className="text-gray-500 text-sm sm:text-base pb-6 sm:pb-10">
          Or just reach out manually at{" "}
          <a
            href="mailto:laibagfx421@gmail.com"
            className="text-pink-600 hover:underline"
          >
            laibagfx421@gmail.com
          </a>
        </p>

        <div className="space-y-5 sm:space-y-6">
          {/* Name */}
          <div>
            <label
              htmlFor="name"
              className="font-medium block mb-1 text-sm sm:text-base"
            >
              Full Name
            </label>
            <div className="flex items-center border border-slate-300 rounded-full pl-3 h-11 sm:h-12 focus-within:ring-2 focus-within:ring-pink-400 transition">
              <User className="w-4 h-4 text-slate-500" />
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="flex-1 px-2 text-sm sm:text-base outline-none bg-transparent"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="font-medium block mb-1 text-sm sm:text-base"
            >
              Email Address
            </label>
            <div className="flex items-center border border-slate-300 rounded-full pl-3 h-11 sm:h-12 focus-within:ring-2 focus-within:ring-pink-400 transition">
              <Mail className="w-4 h-4 text-slate-500" />
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="flex-1 px-2 text-sm sm:text-base outline-none bg-transparent"
                placeholder="Enter your email address"
                required
              />
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="content"
              className="font-medium block mb-1 text-sm sm:text-base"
            >
              Describe your project
            </label>
            <textarea
              id="content"
              value={formData.content}
              onChange={handleChange}
              name="content"
              rows={4}
              className="w-full p-3 text-sm sm:text-base bg-transparent border border-slate-300 rounded-lg resize-none outline-none focus:ring-2 focus-within:ring-pink-400 transition"
              placeholder="Enter your message"
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="flex items-center justify-center gap-2 mt-2 bg-transparent hover:bg-pink-500 text-pink-600 hover:text-white py-2.5 sm:py-3 text-sm sm:text-base w-full rounded-full transition border-pink-600 border-2"
          >
            {loading ?  <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-pink-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
    </svg> : "Submit Form"}
            <Send className="w-4 h-4" />
          </button>
        </div>
      </motion.form>
    </div>
  );
}
