'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedBotIconProps extends React.SVGProps<SVGSVGElement> {}

const botVariants = {
  hover: { rotate: [0, 15, -15, 0], transition: { duration: 0.5 } },
};

export function AnimatedBotIcon({ className, ...props }: AnimatedBotIconProps) {
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
      variants={botVariants}
      className={cn("mr-2 h-4 w-4", className)}
      {...props}
    >
      <path d="M12 8V4H8" />
      <path d="m8 4 4 4" />
      <rect width="16" height="12" x="4" y="12" rx="2" />
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <path d="M15 18H9" />
    </motion.svg>
  );
}
