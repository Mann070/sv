'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedVideoIconProps extends React.SVGProps<SVGSVGElement> {}

const videoVariants = {
  hover: { scale: [1, 1.1, 1], transition: { duration: 0.5 } },
};

export function AnimatedVideoIcon({
  className,
  ...props
}: AnimatedVideoIconProps) {
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
      variants={videoVariants}
      whileHover="hover"
      className={cn('mr-2 h-4 w-4', className)}
      {...props}
    >
      <path d="m22 8-6 4 6 4V8Z" />
      <rect width="14" height="12" x="2" y="6" rx="2" ry="2" />
    </motion.svg>
  );
}
