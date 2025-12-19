'use client';

import { motion } from 'framer-motion';
import { ArrowRight, Globe, Users, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import HomeImage from './assets/home.png';

export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 overflow-hidden">
      <div className="flex flex-col lg:flex-row h-screen">

        {/* Left Side - Image */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 relative h-1/2 lg:h-full w-full bg-gray-100"
        >
          <Image
            src={HomeImage}
            alt="RuralShores Vision"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-linear-to-r from-black/30 to-transparent" />
        </motion.div>

        {/* Right Side - Content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 flex flex-col justify-center px-8 sm:px-16 lg:px-24 py-12 lg:py-0 h-1/2 lg:h-full overflow-y-auto"
        >
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h2 className="text-brand font-semibold tracking-wide uppercase text-sm mb-4">
                Empowering Communities
              </h2>
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 mb-6 leading-tight">
                Connecting <span className="text-brand">Rural Talent</span> to Global Opportunities.
              </h1>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
            >
              At RuralShores, our vision is to transform lives by bringing sustainable professional opportunities to the heart of rural communities. We bridge the digital divide, fostering economic growth and empowering the next generation of leaders.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link href="/login" className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-white bg-brand hover:bg-brand/90 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <button className="inline-flex items-center justify-center px-8 py-4 text-base font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-full transition-all duration-300">
                Learn More
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
