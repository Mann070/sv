'use client';

import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface AnimatedDashboardIconProps extends React.SVGProps<SVGSVGElement> {}

const iconVariants = {
  initial: {
    scale: 1,
  },
  hover: {
    scale: 1.1,
    transition: { type: 'spring', stiffness: 300 },
  },
};

export function AnimatedDashboardIcon({
  className,
  ...props
}: AnimatedDashboardIconProps) {
  return (
    <motion.div initial="initial" whileHover="hover" className="mr-2">
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
        variants={iconVariants}
        className={cn('h-4 w-4', className)}
        {...props}
      >
        <motion.rect
          width="7"
          height="9"
          x="3"
          y="3"
          rx="1"
          variants={{ hover: { scale: 1.1, y: -1 } }}
        />
        <motion.rect
          width="7"
          height="5"
          x="14"
          y="3"
          rx="1"
          variants={{ hover: { scale: 1.1, y: -1 } }}
        />
        <motion.rect
          width="7"
          height="9"
          x="14"
          y="12"
          rx="1"
          variants={{ hover: { scale: 1.1, y: 1 } }}
        />
        <motion.rect
          width="7"
          height="5"
          x="3"
          y="16"
          rx="1"
          variants={{ hover: { scale: 1.1, y: 1 } }}
        />
      </motion.svg>
    </motion.div>
  );
}
