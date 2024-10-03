"use client";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { verifySchema } from "@/schemas/verifySchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { useParams, useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const VerifyCode = () => {
	const router = useRouter();
	const params = useParams<{ username: string }>();
	const { toast } = useToast();

	const form = useForm<z.infer<typeof verifySchema>>({
		resolver: zodResolver(verifySchema),
		defaultValues: {
			code: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof verifySchema>) => {
		try {
			const response = await axios.post("/api/verify-code", {
				username: params.username,
				code: data.code,
			});

			toast({
				title: "Verification successful.",
				description: response.data.message,
				duration: 3000,
			});
			router.replace(`/sign-in`);
		} catch (error) {
			console.log("Error in verifying code ", error);
			const axiosError = error as AxiosError<ApiResponse>;
			let errorMessage = axiosError.response?.data.message;

			toast({
				title: "Verification failed.",
				description:
					errorMessage ?? "An error occurred while verifying code.",
				duration: 3000,
			});
		}
	};
	return (
		<div className="flex justify-center items-center min-h-screen">
			<div className="w-full max-w-lg p-8 space-y-8 rounded-lg shadow-md">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold tracking-tight mb-6">
						Verify Your Accout
					</h1>
					<p className="mb-4">
						Enter the verification code sent to your email address.
					</p>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							name="code"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>Verification code</FormLabel>
									<FormControl>
										<Input
											type="number"
											autoComplete="off"
											placeholder="Enter verification code"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">Submit</Button>
					</form>
				</Form>
			</div>
		</div>
	);
};

export default VerifyCode;
