'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedLightbulbIconProps extends React.SVGProps<SVGSVGElement> {}

const lightbulbVariants = {
  hover: {
    scale: [1, 1.2, 1],
    rotate: [0, 10, -10, 0],
    transition: { duration: 0.7 },
  },
};

export function AnimatedLightbulbIcon({
  className,
  ...props
}: AnimatedLightbulbIconProps) {
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
      variants={lightbulbVariants}
      whileHover="hover"
      className={cn('mr-2 h-4 w-4', className)}
      {...props}
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </motion.svg>
  );
}
