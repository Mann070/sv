"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";

interface HospitalIconProps extends HTMLMotionProps<"div"> {
  size?: number;
  duration?: number;
}

const HospitalIcon = ({
  className,
  size = 28,
  duration = 1,
  ...props
}: HospitalIconProps) => {
  const easeInOutArray: [number, number, number, number] = [0.42, 0, 0.58, 1];

  const drawVariant: Variants = {
    initial: { pathLength: 0 },
    hover: {
      pathLength: [0, 1],
      transition: { duration: 0.8 * duration, ease: easeInOutArray },
    },
  };

  return (
    <motion.div
      className={cn("inline-flex items-center justify-center", className)}
      initial="initial"
      whileHover="hover"
      {...props}
    >
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {/* Building outline */}
        <motion.rect x="2" y="6" width="20" height="15" rx="2" variants={drawVariant} />
        {/* Roof / entrance */}
        <motion.path d="M7 6V4h10v2" variants={drawVariant} />
        {/* Medical plus sign */}
        <motion.path d="M12 11v6" variants={drawVariant} />
        <motion.path d="M9 14h6" variants={drawVariant} />
      </motion.svg>
    </motion.div>
  );
};

HospitalIcon.displayName = "HospitalIcon";
export { HospitalIcon };
