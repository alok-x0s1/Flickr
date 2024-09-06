import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import { Message } from "@/models/userModel";
import axios, { AxiosError } from "axios";
import { useToast } from "./ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";

type MessageCardType = {
	message: Message;
	onMessageDelete: (messageId: string) => void;
};

export function AlertComp({ message, onMessageDelete }: MessageCardType) {
	const { toast } = useToast();
	const handleDeleteConfirm = async () => {
		try {
			const response = await axios.delete<ApiResponse>(
				`/api/delete-message/${message._id}`
			);

			toast({
				title: "Message deleted",
				description: response.data.message,
				duration: 3000,
			});
			onMessageDelete(message._id as string);
		} catch (error) {
			console.log("Error in deleting message ", error);
			const axiosError = error as AxiosError<ApiResponse>;
			let errorMessage = axiosError.response?.data.message;

			toast({
				title: "Failed to delete message",
				description:
					errorMessage ?? "An error occurred while deleting message.",
				duration: 3000,
			});
		}
	};

	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<Button variant="destructive">
					{" "}
					<Trash2 className="w-5 h-5" />{" "}
				</Button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>
						Are you absolutely sure?
					</AlertDialogTitle>
					<AlertDialogDescription>
						This action cannot be undone. This will permanently
						delete your account and remove your data from our
						servers.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction onClick={handleDeleteConfirm}>
						Continue
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}

export function MessageCard({ message, onMessageDelete }: MessageCardType) {
	return (
		<Card>
			<CardHeader>
				<CardTitle>{message.createdAt.toString()}</CardTitle>
			</CardHeader>
			<CardContent>{message.content}</CardContent>
			<CardFooter>
				<div className="ml-6 mb-4">
					<AlertComp
						message={message}
						onMessageDelete={onMessageDelete}
					/>
				</div>
			</CardFooter>
		</Card>
	);
}
