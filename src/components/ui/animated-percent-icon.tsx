'use client';

import { motion } from 'framer-motion';
import { Percent } from 'lucide-react';

export function AnimatedPercentIcon({ className }: { className?: string }) {
  return (
    <motion.div
      whileHover={{
        scale: [1, 1.2, 1],
        rotate: [0, 15, -15, 0],
      }}
      transition={{
        duration: 0.7,
        ease: 'easeInOut',
        repeat: Infinity,
        repeatDelay: 0.5,
      }}
    >
      <Percent className={className} />
    </motion.div>
  );
}
