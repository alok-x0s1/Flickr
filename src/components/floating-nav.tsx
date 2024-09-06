import React from "react";
import { signOut } from "next-auth/react";
import { FloatingDock } from "@/components/ui/floating-dock";
import { IconBrandGithub, IconHome } from "@tabler/icons-react";
import {
	User,
	LogInIcon,
	LogOutIcon,
	SquareDashedKanban,
	Airplay,
	Cpu,
} from "lucide-react";

interface NavbarItem {
	isLoggedIn: boolean;
	username: string;
}

interface FloatingNavProps {
	navbarItems: NavbarItem;
}

export function FloatingNav({ navbarItems }: FloatingNavProps) {
	const links = [
		{
			title: "Home",
			icon: (
				<IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "/",
		},
		{
			title: "About",
			icon: (
				<Airplay className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "/about",
		},
		{
			title: navbarItems.isLoggedIn
				? `Welcome, ${navbarItems.username}`
				: "Hello, User",
			icon: (
				<User className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "/profile",
			visible: navbarItems.isLoggedIn,
		},
		{
			title: "Dashboard",
			icon: (
				<SquareDashedKanban className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "/dashboard",
			visible: navbarItems.isLoggedIn,
		},
		{
			title: "Hello world",
			icon: (
				<Cpu className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "/hello-world",
			visible: !navbarItems.isLoggedIn,
		},
		{
			title: "GitHub",
			icon: (
				<IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
			),
			href: "https://github.com/alok-x0s1",
		},
	];

	if (navbarItems.isLoggedIn) {
		links.push({
			title: "Logout",
			icon: (
				<button
					onClick={() => signOut()}
					className="flex justify-center items-center text-neutral-500 dark:text-neutral-300"
				>
					<LogOutIcon />
				</button>
			),
			href: "#",
		});
	} else {
		links.push({
			title: "Login",
			icon: (
				<LogInIcon className="flex justify-center items-center text-neutral-500 dark:text-neutral-300" />
			),
			href: "/sign-in",
		});
	}

	return (
		<div className="flex items-center justify-center h-[5rem] w-full">
			<FloatingDock
				mobileClassName="translate-y-20"
				items={links.filter((link) => link.visible !== false)}
			/>
		</div>
	);
}
