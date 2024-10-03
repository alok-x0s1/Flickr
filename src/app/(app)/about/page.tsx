import { OurMission } from "@/components/OurMission";
import { PinContainer } from "@/components/ui/3d-pin";
import { Button } from "@/components/ui/button";
import { Cover } from "@/components/ui/cover";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { Vortex } from "@/components/ui/vortex";
import { orbitron } from "@/data/font";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

const About = () => {
	return (
		<div className="w-full min-h-screen flex flex-col items-center pt-12">
			<div>
				<h1 className="text-4xl mt-16 md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
					Learn something more <br /> about{" "}
					<Cover className={cn(orbitron.className)}>
						Flicker_rrr...
					</Cover>
				</h1>
			</div>
			<OurMission />
			<PinContainer
				title="@Github/alok-x0s1"
				href="https://github.com/alok-x0s1"
			>
				<div className="flex basis-full flex-col p-4 tracking-tight sm:basis-1/2 w-[20rem] h-[20rem] ">
					<h3
						className={cn(
							"max-w-xs !pb-2 !m-0 font-bold  text-base",
							orbitron.className
						)}
					>
						@LokYadav
					</h3>
					<div className="text-base !m-0 !p-0 font-normal">
						<span className="text-slate-500 ">
							It will be really good, if you give a start on
							Github.
						</span>
					</div>
					<div className="flex flex-1 w-full rounded-lg mt-4 bg-gradient-to-br from-violet-500 via-purple-500 to-blue-500" />
				</div>
			</PinContainer>

			<div className="max-w-7xl mt-44 mb-12">
				<TextGenerateEffect words={words} />
			</div>
			<div className="w-full mx-auto rounded-md  h-screen overflow-hidden">
				<Vortex
					backgroundColor="hsl(var(--background))"
					rangeY={800}
					particleCount={500}
					baseHue={120}
					className="flex items-center flex-col justify-center px-2 md:px-10  py-4 w-full h-full"
				>
					<h2 className="text-white text-2xl md:text-6xl font-bold text-center">
						The hell is this?
					</h2>
					<p className="text-white text-sm md:text-xl max-w-xl mt-6 text-center">
						We&apos;re here to help and answer any questions you
						might have. We look forward to hearing from you
					</p>
					<div className="flex flex-col sm:flex-row items-center gap-4 mt-6">
						<Link href="/contact">
							<Button className={`${orbitron.className}`}>
								Contact us
							</Button>
						</Link>
					</div>
				</Vortex>
			</div>
		</div>
	);
};

export default About;

const words = `In the digital wilderness, where every click is a leap of faith, we're the guiding star. Flicker isn’t just another website; it's a sanctuary of clarity amidst the noise. When the world shouts, we whisper. Calm, collected, unshakeable. Here, every word counts, every interaction is a promise, and every outcome is crafted with care. Embrace the stillness, where technology meets tranquility.`;
