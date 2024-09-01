import dbConnection from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import UserModel from "@/models/userModel";
import mongoose from "mongoose";

export async function GET(request: Request) {
	await dbConnection();

	const session = await getServerSession(authOptions);
	const user: User = session?.user as User;

	if (!session || !user) {
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

	try {
		const existingUser = await UserModel.aggregate([
			{
				$match: { _id: new mongoose.Types.ObjectId(user._id) },
			},
			{
				$project: {
					username: 1,
					email: 1,
					messagesCount: { $size: "$messages" },
					isAcceptingMessage: 1,
					isVerified: 1,
				},
			},
		]);

		if (!existingUser.length) {
			return Response.json(
				{
					success: false,
					message: "User not found",
				},
				{
					status: 404,
				}
			);
		}

		return Response.json(
			{
				success: true,
				message: "User details retrieved successfully",
				user: existingUser[0],
			},
			{
				status: 200,
			}
		);
	} catch (error: any) {
		return Response.json(
			{
				success: false,
				message: "Failed to retrieve messages",
				error: error.message,
			},
			{
				status: 500,
			}
		);
	}
}
