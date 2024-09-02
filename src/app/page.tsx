import { Faq } from "@/components/Faq";
import { FeaturesSection } from "@/components/FeaturedSection";
import { Testimonials } from "@/components/Testimonials";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { orbitron } from "@/data/font";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen justify-start items-center flex-col">
			<div className="flex flex-col items-center justify-center h-fit max-w-5xl space-x-8 py-16">
				<h1
					className={cn(
						"md:text-7xl text-3xl lg:text-9xl font-bold text-center relative z-20 my-14",
						orbitron.className
					)}
				>
					Whisper Box
				</h1>

				<TypewriterEffectSmooth words={words} />
				<p className="max-w-4xl text-xs sm:text-base text-center mb-12">
					We believe in the power of private and meaningful
					conversations. Whether you’re looking to share your
					thoughts, seek feedback, or just connect with others without
					revealing your identity, our platform is designed to provide
					a secure and user-friendly space for anonymous interactions.
				</p>
				<div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
					<Link href="/sign-in">
						<Button variant="outline">Join now</Button>
					</Link>
					<Link href="/sign-up">
						<Button>Signup</Button>
					</Link>
				</div>
			</div>
			<div>
				<h2
					className={cn(
						"md:text-5xl text-3xl lg:text-6xl font-bold relative z-20 my-14 text-start",
						orbitron.className
					)}
				>
					Featured section
				</h2>
				<FeaturesSection />
			</div>
			<div className="max-w-7xl">
				<h2
					className={cn(
						"md:text-5xl text-3xl lg:text-6xl font-bold relative z-20 my-14 text-start",
						orbitron.className
					)}
				>
					Testimonials
				</h2>
				<Testimonials />
			</div>

			<div className="w-7xl mx-auto">
				<h2
					className={cn(
						"md:text-5xl text-3xl lg:text-6xl font-bold relative z-20 my-14 text-start",
						orbitron.className
					)}
				>
					Faq's
				</h2>
				<Faq />
			</div>
		</main>
	);
}

export const words = [
	{
		text: "Anonymous",
	},
	{
		text: "Messaging",
	},
	{
		text: "Made",
	},
	{
		text: "Simple",
	},
	{
		text: "With",
	},
	{
		text: "Whisper Box.",
		className: "text-blue-500 dark:text-blue-500",
	},
];
