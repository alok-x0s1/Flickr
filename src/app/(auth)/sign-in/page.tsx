"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { signinSchema } from "@/schemas/signinSchema";
import { signIn } from "next-auth/react";
import { cn } from "@/lib/utils";
import { orbitron } from "@/data/font";

const SignIn = () => {
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { toast } = useToast();
	const router = useRouter();

	const form = useForm<z.infer<typeof signinSchema>>({
		resolver: zodResolver(signinSchema),
		defaultValues: {
			identifier: "",
			password: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof signinSchema>) => {
		setIsSubmitting(true);
		const response = await signIn("credentials", {
			redirect: false,
			identifier: data.identifier,
			password: data.password,
		});
		if (response?.error) {
			toast({
				title: "Login Error",
				description: "Incorrect username or password.",
				duration: 3000,
			});
			setIsSubmitting(false);
			return;
		}
		toast({
			title: "Success",
			description: "Login successfully. Welcome back!",
			duration: 3000,
		});
		if (response?.url) {
			router.replace("/dashboard");
		}
		setIsSubmitting(false);
	};
	return (
		<div className="flex justify-center items-start p-12 min-h-screen">
			<div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-sm border shadow-gray-500">
				<div className="text-center">
					<h1
						className={cn(
							"text-4xl font-extrabold tracking-tight mb-6",
							orbitron.className
						)}
					>
						Join Flickr
					</h1>
					<p className="mb-4">
						Sign in to your account to connect with like-minded
						individuals around the world.
					</p>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							name="identifier"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Email</FormLabel>
									<FormControl>
										<Input
											type="email"
											placeholder="johndoe@gmail.com"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="password"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Password</FormLabel>
									<FormControl>
										<Input
											type="password"
											placeholder="1-johndoePassword"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>

						<Button type="submit" disabled={isSubmitting}>
							{isSubmitting ? (
								<>
									<Loader2 className="animate-spin mr-2 h-4 w-4" />
									Please wait...
								</>
							) : (
								"Sign in"
							)}
						</Button>
					</form>
				</Form>
				<div className="mt-4 text-center">
					<p>
						Not a member yet ?{" "}
						<Link
							href="/sign-up"
							className="text-blue-600 hover:text-blue-800 hover:underline duration-200"
						>
							Sign up
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default SignIn;
