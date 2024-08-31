import dbConnection from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";
import mongoose from "mongoose";
import UserModel from "@/models/userModel";

export async function GET(request: Request) {
	await dbConnection();

	const session = await getServerSession(authOptions);
	const user: User = session?.user as User;

	if (!session || !user) {
		return Response.json(
			{
				success: false,
				message: "Not authenticated.",
			},
			{
				status: 401,
			}
		);
	}

	const userId = new mongoose.Types.ObjectId(user._id);
	try {
		const user = await UserModel.aggregate([
			{
				$match: {
					_id: userId,
				},
			},
			{
				$unwind: "$messages",
			},
			{
				$sort: {
					"messages.createdAt": -1,
				},
			},
			{
				$group: {
					_id: "$_id",
					messages: {
						$push: "$messages",
					},
				},
			},
		]);

		if (!user || user.length === 0) {
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
				messages: user[0].messages,
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.error(error);
		return Response.json(
			{
				success: false,
				message: "Internal Server Error, Please try again later.",
			},
			{
				status: 500,
			}
		);
	}
}
