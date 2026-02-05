'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const iconVariants = {
  hover: {
    scale: 1.2,
    rotate: 90,
    transition: { type: 'spring', stiffness: 300 },
  },
};

export function AnimatedPlusCircleIcon({ className }: { className?: string }) {
  return (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn(className)}
      variants={iconVariants}
      whileHover="hover"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" x2="12" y1="8" y2="16" />
      <line x1="8" x2="16" y1="12" y2="12" />
    </motion.svg>
  );
}
