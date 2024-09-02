import { cn } from "@/lib/utils";
import {
	IconClock,
	IconHeart,
	IconHelp,
	IconLock,
	IconRefresh,
	IconShield,
	IconStar,
	IconUsers,
} from "@tabler/icons-react";

export function FeaturesSection() {
	const features = [
		{
			title: "Anonymity Guaranteed",
			description:
				"Your privacy is our top priority. Send and receive messages without revealing your identity.",
			icon: <IconLock />,
		},
		{
			title: "User-Friendly Interface",
			description:
				"Intuitive design that makes sending and receiving anonymous messages simple and enjoyable.",
			icon: <IconHelp />,
		},
		{
			title: "Customizable Suggestions",
			description:
				"Get tailored message suggestions based on your interests and preferences.",
			icon: <IconStar />,
		},
		{
			title: "Secure & Reliable",
			description:
				"Our platform ensures the highest level of security and reliability for your anonymous communication.",
			icon: <IconShield />,
		},
		{
			title: "Community Interaction",
			description:
				"Engage with a community of users through anonymous feedback and messages.",
			icon: <IconUsers />,
		},
		{
			title: "24/7 Support",
			description:
				"Our support team is available around the clock to assist you with any issues or questions.",
			icon: <IconClock />,
		},
		{
			title: "No Hidden Costs",
			description:
				"Enjoy all our features without any hidden fees or unexpected charges.",
			icon: <IconRefresh />,
		},
		{
			title: "Continuous Improvement",
			description:
				"We're always enhancing our platform based on user feedback and technological advancements.",
			icon: <IconHeart />,
		},
	];

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 relative z-10 py-10 max-w-7xl mx-auto">
			{features.map((feature, index) => (
				<Feature key={feature.title} {...feature} index={index} />
			))}
		</div>
	);
}

const Feature = ({
	title,
	description,
	icon,
	index,
}: {
	title: string;
	description: string;
	icon: React.ReactNode;
	index: number;
}) => {
	return (
		<div
			className={cn(
				"flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
				(index === 0 || index === 4) &&
					"lg:border-l dark:border-neutral-800",
				index < 4 && "lg:border-b dark:border-neutral-800"
			)}
		>
			{index < 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
			)}
			{index >= 4 && (
				<div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
			)}
			<div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
				{icon}
			</div>
			<div className="text-lg font-bold mb-2 relative z-10 px-10">
				<div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
				<span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
					{title}
				</span>
			</div>
			<p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
				{description}
			</p>
		</div>
	);
};
