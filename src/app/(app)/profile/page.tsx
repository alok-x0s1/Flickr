"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { orbitron } from "@/data/font";
import { ApiResponse } from "@/types/ApiResponse";
import axios, { AxiosError } from "axios";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface UserData {
	username: string;
	email: string;
	isVerified: boolean;
	isAcceptingMessage: boolean;
	messagesCount: number;
}

const Profile = () => {
	const [userData, setUserData] = useState<UserData>({
		username: "",
		email: "",
		isVerified: false,
		isAcceptingMessage: false,
		messagesCount: 0,
	});
	const [isLoading, setIsLoading] = useState(true);

	const { toast } = useToast();

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			try {
				const response = await axios.get(`/api/profile`);
				if (response.data.success) {
					setUserData(response.data.user);

					toast({
						title: "Success",
						description: "Profile fetched successfully.",
						duration: 1000,
					});
				} else {
					toast({
						title: "Error",
						description: response.data.message,
						duration: 2000,
					});
				}
			} catch (error) {
				console.log("Error in getting profile ", error);
				const axiosError = error as AxiosError<ApiResponse>;
				let errorMessage = axiosError.response?.data.message;

				toast({
					title: "Error",
					description:
						errorMessage ??
						"An error occurred while getting profile.",
					duration: 3000,
				});
			}
			setIsLoading(false);
		};
		fetchData();
	}, []);

	return (
		<BackgroundBeamsWithCollision>
			<div className="w-full min-h-screen flex justify-center items-center">
				<Card className="w-[350px] min-h-32">
					{isLoading ? (
						<div className="flex justify-center items-center w-full h-32">
							<Loader2 className="mr-2 h-4 w-4 animate-spin" />
						</div>
					) : (
						<>
							<CardHeader>
								<div className="pb-4">
									<Avatar>
										<AvatarImage
											src="/avatar.png"
											alt="@flickr"
										/>
										<AvatarFallback>WB</AvatarFallback>
									</Avatar>
								</div>
								<CardTitle className={`${orbitron.className}`}>
									Profile
								</CardTitle>
								<CardDescription>
									Get your profile details here.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<form>
									<div className="grid w-full items-center gap-4">
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="name">Name</Label>
											<Input
												className="outline-none"
												id="name"
												value={userData.username}
												readOnly
											/>
										</div>
										<div className="flex flex-col space-y-1.5">
											<Label htmlFor="email">Email</Label>
											<Input
												className="outline-none"
												id="email"
												value={userData.email}
												readOnly
											/>
										</div>

										<div className="flex flex-col space-y-1.5">
											<p>
												Email verification :{" "}
												<div
													className={`inline ${
														userData.isVerified
															? "text-green-500"
															: "text-red-500"
													}`}
												>
													{userData.isVerified
														? "Verified"
														: "Not verified"}
												</div>
											</p>
										</div>

										<div className="flex flex-col space-y-1.5">
											<p>
												Accepting messages :{" "}
												<div
													className={` inline
													${userData.isAcceptingMessage ? "text-green-500" : "text-red-500"}`}
												>
													{userData.isAcceptingMessage
														? "Yes"
														: "No"}
												</div>
											</p>
										</div>

										<div className="flex flex-col space-y-1.5">
											<Link href="/dashboard">
												<Button
													variant="outline"
													className="w-fit"
												>
													Messages count:{" "}
													{userData.messagesCount}
												</Button>
											</Link>
											<p className="text-xs mt-4">
												Click on messages count to see
												messages.
											</p>
										</div>
									</div>
								</form>
							</CardContent>
							<CardFooter className="flex justify-between p-5">
								<Button>Edit profile</Button>
							</CardFooter>
						</>
					)}
				</Card>
			</div>
		</BackgroundBeamsWithCollision>
	);
};

export default Profile;
