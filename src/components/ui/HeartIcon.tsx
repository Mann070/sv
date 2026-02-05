"use client";

import { cn } from "@/lib/utils";
import type { HTMLMotionProps, Variants } from "framer-motion";
import { motion } from "framer-motion";

interface HeartIconProps extends HTMLMotionProps<"div"> {
	size?: number;
	duration?: number;
}

const HeartIcon = ({
	className,
	size = 28,
	duration = 1,
	...props
}: HeartIconProps) => {
	const easeInOutArray: [number, number, number, number] = [0.42, 0, 0.58, 1];

	const drawVariantLeft: Variants = {
		initial: { pathLength: 1 },
		hover: {
			pathLength: [0, 1],
			transition: { duration: 0.7 * duration, ease: easeInOutArray },
		},
	};

	const drawVariantRight: Variants = {
		initial: { pathLength: 1 },
		hover: {
			pathLength: [0, 1],
			transition: {
				duration: 0.7 * duration,
				ease: easeInOutArray,
				delay: 0.2,
			},
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
				<motion.path
					d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676"
					variants={drawVariantLeft}
				/>
				<motion.path
					d="M12.409 5.824A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
					variants={drawVariantRight}
				/>
			</motion.svg>
		</motion.div>
	);
};

HeartIcon.displayName = "HeartIcon";
export { HeartIcon };
