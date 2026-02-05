'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedPillIconProps extends React.SVGProps<SVGSVGElement> {}

const pillVariants = {
  hover: {
    rotate: [0, 10, -10, 0],
    scale: [1, 1.1, 1],
    transition: { duration: 0.5 },
  },
};

export function AnimatedPillIcon({
  className,
  ...props
}: AnimatedPillIconProps) {
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
      variants={pillVariants}
      whileHover="hover"
      className={cn('mr-2 h-4 w-4', className)}
      {...props}
    >
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
    </motion.svg>
  );
}
