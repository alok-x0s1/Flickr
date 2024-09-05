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
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { messageSchema } from "@/schemas/messageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { suggestingMessagesArray } from "@/utils/messagesArray";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const Page = () => {
	const params = useParams<{ username: string }>();
	const [isLoading, setIsLoading] = useState(false);
	const { toast } = useToast();

	const [suggestions, setSuggestions] = useState([
		{
			id: 1,
			content: "How are you today?",
		},
		{
			id: 2,
			content: "What are your plans for the weekend?",
		},
		{
			id: 3,
			content: "Can you recommend a good book?",
		},
	]);
	

	const handleSuggestionClick = (content: string) => {
		form.setValue("content", content);
	};

	const handleSuggestNewMessages = () => {
		const shuffledMessages = [...suggestingMessagesArray].sort(
			() => 0.5 - Math.random()
		);
		const newSuggestions = shuffledMessages.slice(0, 3);
		setSuggestions(newSuggestions);
	};

	const form = useForm<z.infer<typeof messageSchema>>({
		resolver: zodResolver(messageSchema),
		defaultValues: {
			content: "",
		},
	});

	const onSubmit = async (data: z.infer<typeof messageSchema>) => {
		setIsLoading(true);
		try {
			const response = await axios.post("/api/send-message", {
				content: data.content,
				username: params.username,
			});
			console.log("Response : ", response);

			toast({
				title: "Message sent.",
				description: response.data.message,
				duration: 3000,
			});
			form.reset();
		} catch (error) {
			console.log("Error in sending message ", error);
			const axiosError = error as AxiosError<ApiResponse>;
			let errorMessage = axiosError.response?.data.message;

			toast({
				title: "Error",
				description:
					errorMessage ?? "An error occurred while verifying code.",
				duration: 3000,
				variant: "destructive",
			});
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="flex flex-col min-h-[165vh]">
			<div className="w-full max-w-2xl p-8 space-y-8 rounded-lg shadow-md mx-auto">
				<div className="text-center">
					<h1 className="text-4xl font-extrabold tracking-tight mb-6">
						Public Profile link
					</h1>
				</div>

				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="space-y-6"
					>
						<FormField
							name="content"
							control={form.control}
							render={({ field }) => (
								<FormItem>
									<FormLabel>
										Send anonymous message to @
										{params.username}
									</FormLabel>
									<FormControl>
										<Textarea
											placeholder="If you could have dinner with any historical figure, who would it be?"
											{...field}
											className="resize-none"
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<Button type="submit">
							{isLoading ? (
								<>
									<Loader2 className="animate-spin mr-2 h-4 w-4" />
									Please wait...
								</>
							) : (
								"Send Message"
							)}
						</Button>
					</form>
				</Form>
			</div>

			<div className="w-full flex flex-col mt-12 max-w-5xl p-8 space-y-8 mx-auto">
				<Button onClick={handleSuggestNewMessages} className="w-fit">
					Suggest Messages
				</Button>
				<p className="text-left text-base">
					Click on the below messages to select it.
				</p>
				<div className="flex flex-col border border-gray-100 p-6 gap-6 rounded">
					<h3 className="text-xl">Messages</h3>
					{suggestions.map((suggestion) => (
						<button
							key={suggestion.id}
							onClick={() =>
								handleSuggestionClick(suggestion.content)
							}
							className="border px-4 py-2 text-base border-gray-100 rounded text-start hover:bg-white/10 duration-500"
						>
							{suggestion.content}
						</button>
					))}
				</div>
			</div>

			<div className="w-full max-w-5xl p-8 space-y-8 rounded-lg shadow-md mx-auto">
				<Separator />
				<h2 className="text-2xl font-extrabold tracking-tight mb-6 text-center">
					Wanna to get experienced by anonymous message feedback ?
				</h2>
				<p className="text-start text-base">
					Share your anonymous messages with friends and family to get
					feedback on your communication skills, relationships, and
					overall experience. This can help you improve your
					communication and overall life.
				</p>

				<div className="flex items-center justify-center mt-8">
					<Button>
						<Link href="/sign-in">Get started</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};

export default Page;
