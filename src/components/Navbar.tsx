"use client";
import React from "react";
import { useSession } from "next-auth/react";
import { FloatingNav } from "./floating-nav";
import { User } from "next-auth";
import { useTheme } from "next-themes";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { MoonIcon, SunIcon } from "lucide-react";

const Navbar = () => {
	const { data: session } = useSession();
	const user: User = session?.user as User;

	const navbarItems = {
		isLoggedIn: !!session,
		username: user?.username || "",
	};

	const { setTheme } = useTheme();

	return (
		<>
			<nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
				<FloatingNav navbarItems={navbarItems} />
			</nav>
			<nav className="fixed top-4 right-4 z-50">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline" size="icon">
							<SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
							<MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
							<span className="sr-only">Toggle theme</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end">
						<DropdownMenuItem onClick={() => setTheme("light")}>
							Light
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("dark")}>
							Dark
						</DropdownMenuItem>
						<DropdownMenuItem onClick={() => setTheme("system")}>
							System
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</nav>
		</>
	);
};

export default Navbar;
