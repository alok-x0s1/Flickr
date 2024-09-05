"use client";

import { MessageCard } from "@/components/MessageCard";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { orbitron } from "@/data/font";
import { cn } from "@/lib/utils";
import { Message } from "@/models/userModel";
import { acceptMessageSchema } from "@/schemas/acceptMessageSchema";
import { ApiResponse } from "@/types/ApiResponse";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { Link, Loader2, RefreshCcw } from "lucide-react";
import { User } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const Page = () => {
	const [messages, setMessages] = useState<Message[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isSwitchLoading, setIsSwitchLoading] = useState(false);

	const { toast } = useToast();
	const handleDeleteMessage = (messageId: string) => {
		setMessages(messages.filter((message) => message._id !== messageId));
	};

	const { data: session } = useSession();
	const form = useForm({
		resolver: zodResolver(acceptMessageSchema),
	});
	const { register, watch, setValue } = form;
	const acceptMessages = watch("acceptMessages");

	const fetchAcceptMessage = useCallback(async () => {
		setIsSwitchLoading(true);
		try {
			const response = await axios.get("/api/accept-message");
			setValue("acceptMessages", response.data.isAcceptingMessages);
		} catch (error) {
			console.log("Error in getting status ", error);
			const axiosError = error as AxiosError<ApiResponse>;
			let errorMessage = axiosError.response?.data.message;

			toast({
				title: "Error",
				description:
					errorMessage ?? "An error occurred while getting status.",
				duration: 3000,
			});
		} finally {
			setIsSwitchLoading(false);
		}
	}, [setValue]);

	const fetchMessages = useCallback(async () => {
		setIsLoading(true);
		try {
			const response = await axios.get<ApiResponse>("/api/get-messages");
			setMessages(response.data.messages || []);
		} catch (error) {
			console.log("Error in fetching messages ", error);
			const axiosError = error as AxiosError<ApiResponse>;
			let errorMessage = axiosError.response?.data.message;

			toast({
				title: "Error",
				description:
					errorMessage ??
					"An error occurred while fetching messages.",
				duration: 3000,
			});
		} finally {
			setIsLoading(false);
		}
	}, [setIsLoading, setMessages]);

	useEffect(() => {
		if (!session || !session.user) return;
		fetchAcceptMessage();
		fetchMessages();
	}, [session, fetchAcceptMessage, fetchMessages, setValue]);

	const handleSwitchChange = async () => {
		setIsSwitchLoading(true);
		try {
			const response = await axios.post("/api/accept-message", {
				acceptMessages: !acceptMessages,
			});

			toast({
				title: "Success",
				description: response.data.message,
				duration: 3000,
			});
			setValue("acceptMessages", !acceptMessages);
		} catch (error) {
			console.log("Error in switch change ", error);
			const axiosError = error as AxiosError<ApiResponse>;
			let errorMessage = axiosError.response?.data.message;

			toast({
				title: "Error",
				description:
					errorMessage ?? "An error occurred while switching status.",
				duration: 3000,
			});
		} finally {
			setIsSwitchLoading(false);
		}
	};

	if (!session || !session.user) {
		return <div>Please Login</div>;
	}

	const { username } = session.user as User;
	const baseUrl = `${window.location.protocol}//${window.location.hostname}`;
	const profileUrl = `${baseUrl}/w/${username}`;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(profileUrl);
		toast({
			title: "Copied",
			description: "Profile URL has been copied to clipboard.",
			duration: 3000,
		});
	};

	return (
		<div className="my-8 md:mx-8 lg:mx-auto p-6 rounded w-full max-w-6xl pb-16 min-h-screen">
			<h1 className={cn("text-4xl font-bold mb-12", orbitron.className)}>
				Welcome, {username}!
			</h1>

			<div className="mb-8">
				<h2 className="text-lg font-semibold mb-4">
					Copy your unique Profile Link here
				</h2>
				<div className="flex items-center">
					<input
						type="text"
						className="w-full p-3 mr-2 outline-none rounded border border-green-100 backdrop-blur-md bg-transparent"
						value={profileUrl}
						readOnly
					/>
					<Button
						onClick={copyToClipboard}
						className="ml-2 text-md p-6 font-semibold flex gap-2"
					>
						Copy <Link />
					</Button>
				</div>
			</div>

			<div className="mb-8">
				<div className="flex items-center gap-6 mb-4">
					<div>
						<Switch
							{...register("acceptMessages")}
							checked={!!acceptMessages}
							onCheckedChange={handleSwitchChange}
							disabled={isSwitchLoading}
						/>
					</div>
					<p
						className={`text-md font-semibold mb-4 ${
							acceptMessages ? "text-green-500" : "text-red-500"
						}`}
					>
						{" "}
						{acceptMessages ? "Active" : "Inactive"}
					</p>
				</div>

				<p className="text-sm font-semibold">
					{acceptMessages
						? "Messages will be accepted : "
						: "Messages will be rejected  : "}
					Click to toggle your status.
				</p>
			</div>

			<Separator />

			<Button
				className="mt-4"
				variant="outline"
				onClick={(e) => {
					e.preventDefault();
					fetchMessages();
				}}
			>
				Fetch Latest Messages
				{isLoading ? (
					<Loader2 className="animate-spin ml-2 h-4 w-4" />
				) : (
					<RefreshCcw className="ml-2 h-4 w-4" />
				)}
			</Button>

			<div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{messages.length > 0 ? (
					messages.map((message) => (
						<MessageCard
							key={message._id as string}
							message={message}
							onMessageDelete={handleDeleteMessage}
						/>
					))
				) : (
					<p className="text-center">
						No messages found. Please try again later.
					</p>
				)}
			</div>
		</div>
	);
};

export default Page;
