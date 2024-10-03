"use client";
import React from "react";

import { AnimatePresence, motion } from "framer-motion";
import { CanvasRevealEffect } from "@/components/ui/canvas-reveal-effect";
import {  Webhook } from "lucide-react";
import { cn } from "@/lib/utils";
import { orbitron } from "@/data/font";

export function OurMission() {
	return (
		<>
			<div className="py-20 flex flex-col lg:flex-row items-center justify-center w-full gap-4 mx-auto px-8">
				<Card
					title="Our mission"
					description="At Flickr, our mission is to create a platform where people can share their thoughts and receive anonymous feedback securely and effortlessly."
					icon={<Logo />}
				>
					<CanvasRevealEffect
						animationSpeed={5.1}
						containerClassName="bg-emerald-900"
					/>
				</Card>
				<Card
					title="Our values"
					description="We are committed to safeguarding your privacy and ensuring your data is protected. We strive to provide an intuitive and user-friendly experience."
					icon={<Logo />}
				>
					<CanvasRevealEffect
						animationSpeed={3}
						containerClassName="bg-black"
						colors={[
							[236, 72, 153],
							[232, 121, 249],
						]}
						dotSize={2}
					/>
					<div className="absolute inset-0 [mask-image:radial-gradient(400px_at_center,white,transparent)] bg-black/50 dark:bg-black/90" />
				</Card>
				<Card
					title="Our team"
					description="We continuously work on improving our platform with new features and enhancements."
					icon={<Logo />}
				>
					<CanvasRevealEffect
						animationSpeed={3}
						containerClassName="bg-sky-600"
						colors={[[125, 211, 252]]}
					/>
				</Card>
			</div>
		</>
	);
}

const Card = ({
	title,
	icon,
	description,
	children,
}: {
	title: string;
	icon: React.ReactNode;
	description: string;
	children?: React.ReactNode;
}) => {
	const [hovered, setHovered] = React.useState(false);
	return (
		<div
			onMouseEnter={() => setHovered(true)}
			onMouseLeave={() => setHovered(false)}
			className="border border-black/[0.2] group/canvas-card flex items-center justify-center dark:border-white/[0.2]  max-w-sm w-full mx-auto p-4 relative h-[30rem]"
		>
			<Icon className="absolute h-6 w-6 -top-3 -left-3 dark:text-white text-black" />
			<Icon className="absolute h-6 w-6 -bottom-3 -left-3 dark:text-white text-black" />
			<Icon className="absolute h-6 w-6 -top-3 -right-3 dark:text-white text-black" />
			<Icon className="absolute h-6 w-6 -bottom-3 -right-3 dark:text-white text-black" />

			<AnimatePresence>
				{hovered && (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="h-full w-full absolute inset-0"
					>
						{children}
					</motion.div>
				)}
			</AnimatePresence>

			<div className="relative z-20">
				<div className="text-center text-6xl group-hover/canvas-card:-translate-y-4 group-hover/canvas-card:opacity-0 transition duration-200 w-full  mx-auto flex items-center justify-center">
					{icon}
				</div>
				<h2 className={cn("dark:text-white text-xl opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200", orbitron.className)}>
					{title}
				</h2>
				<p className="dark:text-white opacity-0 group-hover/canvas-card:opacity-100 relative z-10 text-black mt-4  font-bold group-hover/canvas-card:text-white group-hover/canvas-card:-translate-y-2 transition duration-200">
					{description}
				</p>
			</div>
		</div>
	);
};

const Logo = () => {
	return (
		<div className="text-4xl">
			<Webhook />
		</div>
	);
};

export const Icon = ({ className, ...rest }: any) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 24 24"
			strokeWidth="1.5"
			stroke="currentColor"
			className={className}
			{...rest}
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M12 6v12m6-6H6"
			/>
		</svg>
	);
};
