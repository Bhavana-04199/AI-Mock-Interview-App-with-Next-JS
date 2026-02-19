"use client";

import { Button } from "@/components/ui/button";
import Image from "next/image";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="w-full min-h-screen flex flex-col bg-gray-950 text-white">
      
      {/* ================= NAVBAR ================= */}
      <header className="absolute top-0 left-0 w-full z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl md:text-2xl font-bold tracking-wide">
            AI Interview
          </h1>

          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-black transition"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Dashboard
          </Button>
        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background */}
        <Image
          src="/path-to-your-background-image.jpg"
          alt="AI Interview Background"
          fill
          priority
          className="object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/80" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center max-w-2xl px-6"
        >
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            Virtual AI Interview
          </h1>

          <p className="text-lg md:text-xl text-gray-200 mb-10">
            Experience realistic AI-powered mock interviews that help you
            prepare with confidence and improve your technical communication.
          </p>

          <Button
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 text-lg rounded-xl shadow-lg transition-transform duration-300 hover:scale-105"
            onClick={() => (window.location.href = "/dashboard")}
          >
            Get Started
          </Button>
        </motion.div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-gray-950 py-20 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-14">
            Why Choose Our Platform
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold mb-4">
                Realistic Interviews
              </h3>
              <p className="text-gray-300">
                Simulate real technical interviews with AI-generated
                questions tailored to your role.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold mb-4">
                Instant Feedback
              </h3>
              <p className="text-gray-300">
                Receive detailed performance insights and improvement
                suggestions instantly.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              whileHover={{ y: -6 }}
              className="bg-white/5 border border-white/10 rounded-2xl p-8 backdrop-blur-md"
            >
              <h3 className="text-xl font-semibold mb-4">
                Role-Based Practice
              </h3>
              <p className="text-gray-300">
                Practice for specific roles like Frontend, Backend,
                DevOps, and more.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ================= FOOTER ================= */}
      <footer className="border-t border-white/10 py-6 text-center text-gray-400 text-sm">
        © {new Date().getFullYear()} AI Interview Platform. All rights reserved.
      </footer>
    </div>
  );
}
