'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const iconVariants = {
  hover: {
    scale: 1.1,
    rotate: [0, 10, -10, 0],
    transition: { duration: 0.5 },
  },
};

export function AnimatedMenuIcon({ className }: { className?: string }) {
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
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </motion.svg>
  );
}
