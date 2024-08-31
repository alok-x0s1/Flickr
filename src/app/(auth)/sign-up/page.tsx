"use client";

import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useDebounceCallback } from "usehooks-ts";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { signupSchema } from "@/schemas/signupSchema";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
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

const Page = () => {
	const [username, setUsername] = useState("");
	const [usernameMessage, setUsernameMessage] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [isSubmitting, setIsSubmitting] = useState(false);

	const { toast } = useToast();
	const router = useRouter();
	const debounced = useDebounceCallback(setUsername, 500);

	const form = useForm<z.infer<typeof signupSchema>>({
		resolver: zodResolver(signupSchema),
		defaultValues: {
			username: "",
			email: "",
			password: "",
		},
	});

	useEffect(() => {
		const validateUsername = async () => {
			if (username) {
				setIsLoading(true);
				setUsernameMessage("");
				try {
					const response = await axios.get(
						`/api/check-username-unique?username=${username}`
					);
					setUsernameMessage(response.data.message);
				} catch (error) {
					console.log("Error in checking username ", error);
					const axiosError = error as AxiosError<ApiResponse>;
					let errorMessage = axiosError.response?.data.message;

					toast({
						title: "Username checking failed.",
						description:
							errorMessage ??
							"An error occurred while checking username.",
						duration: 3000,
					});
				}
				setIsLoading(false);
			}
		};
		validateUsername();
	}, [username]);

	const onSubmit = async (data: z.infer<typeof signupSchema>) => {
		setIsSubmitting(true);
		console.log("Data inside react-hook-form : onSubmit => ", data);
		try {
			const response = await axios.post<ApiResponse>(
				`/api/sign-up`,
				data
			);
			toast({
				title: "Success",
				description: response.data.message,
				duration: 3000,
			});
			router.replace(`/verify-code/${username}`);
		} catch (error) {
			console.log("Error in signup ", error);
			const axiosError = error as AxiosError<ApiResponse>;
			let errorMessage = axiosError.response?.data.message;

			toast({
				title: "Signup failed.",
				description: errorMessage ?? "An error occurred while signup.",
				duration: 3000,
			});
		}
		setIsSubmitting(false);
	};
	return (
		<div className="flex justify-center items-start p-12 min-h-[110vh]">
			<div className="w-full max-w-md p-8 space-y-8 rounded-lg shadow-sm border shadow-gray-500">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold tracking-tight mb-6">
						Join Whisper Box
					</h1>
					<p className="mb-4">
						Create a new account for free and connect with
						like-minded individuals around the world.
					</p>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							name="username"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Username</FormLabel>
									<FormControl>
										<Input
											type="text"
											placeholder="John Doe"
											{...field}
											onChange={(e) => {
												field.onChange(e);
												debounced(e.target.value);
											}}
										/>
									</FormControl>
									{isLoading && (
										<Loader2 className="animate-spin"></Loader2>
									)}
									<p
										className={`text-sm ${
											usernameMessage ===
											"Username is unique."
												? "text-green-600"
												: "text-red-600"
										}`}
									>
										{usernameMessage}
									</p>
									<FormMessage />
								</FormItem>
							)}
						/>

						<FormField
							name="email"
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
								"Sign up"
							)}
						</Button>
					</form>
				</Form>
				<div className="mt-4 text-center">
					<p>
						Already a member ?{" "}
						<Link
							href="/sign-in"
							className="text-blue-600 hover:text-blue-800 hover:underline duration-200"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
};

export default Page;
