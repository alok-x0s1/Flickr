import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import dbConnection from "@/lib/dbConnect";
import UserModel from "@/models/userModel";
import { User } from "next-auth";

export async function POST(request: Request) {
	await dbConnection();
	const session = await getServerSession(authOptions);
	const user: User = session?.user as User;

	if (!session || !session?.user) {
		return Response.json(
			{
				success: false,
				message: "Not authenticated, Please Login.",
			},
			{
				status: 401,
			}
		);
	}

	const userId = user._id;
	const { acceptMessages } = await request.json();

	try {
		const user = await UserModel.findByIdAndUpdate(
			userId,
			{
				isAcceptingMessage: acceptMessages,
			},
			{ new: true }
		);

		if (!user) {
			return Response.json(
				{
					success: false,
					message: "Failed to update user toggle message",
				},
				{
					status: 401,
				}
			);
		}

		return Response.json(
			{
				success: true,
				message: "Message acceptance status updated.",
				user,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return Response.json(
			{
				success: false,
				message: "Error while updating toggle message.",
			},
			{
				status: 500,
			}
		);
	}
}

export async function GET(request: Request) {
	await dbConnection();
	const session = await getServerSession(authOptions);
	const user: User = session?.user as User;

	if (!session || !session?.user) {
		return Response.json(
			{
				success: false,
				message: "Not authenticated, Please Login.",
			},
			{
				status: 401,
			}
		);
	}

	const userId = user._id;
	try {
		const foundUser = await UserModel.findById(userId);
		if (!foundUser) {
			return Response.json(
				{
					success: false,
					message: "User not found.",
				},
				{
					status: 404,
				}
			);
		}

		return Response.json(
			{
				success: true,
				message: "Status fetched successfully.",
				isAcceptingMessages: user.isAcceptingMessage,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.log(error);
		return Response.json(
			{
				success: false,
				message: "Something went wrong, please try again...",
			},
			{
				status: 500,
			}
		);
	}
}
