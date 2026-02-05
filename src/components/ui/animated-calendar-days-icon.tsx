'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedCalendarDaysIconProps extends React.SVGProps<SVGSVGElement> {}

const calendarVariants = {
  hover: { rotate: [0, 5, -5, 0], transition: { duration: 0.5 } },
};

export function AnimatedCalendarDaysIcon({
  className,
  ...props
}: AnimatedCalendarDaysIconProps) {
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
      variants={calendarVariants}
      whileHover="hover"
      className={cn('mr-2 h-4 w-4', className)}
      {...props}
    >
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
      <path d="M16 18h.01" />
    </motion.svg>
  );
}
