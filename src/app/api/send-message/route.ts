import dbConnection from "@/lib/dbConnect";
import User, { Message } from "@/models/userModel";

export async function POST(request: Request) {
	await dbConnection();

	const { username, content } = await request.json();
	try {
		const user = await User.findOne({
			username,
		});

		if (!user) {
			return Response.json(
				{
					success: false,
					message: "User not found with this name.",
				},
				{
					status: 404,
				}
			);
		}

		if (!user.isAcceptingMessage) {
			return Response.json(
				{
					success: false,
					message: "User is not accepting the messages.",
				},
				{
					status: 403,
				}
			);
		}

		const newMessage = {
			content,
			createdAt: new Date(),
		};
		user.messages.push(newMessage as Message);
		await user.save();

		return Response.json(
			{
				success: true,
				message: "Message sent successfully.",
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		return Response.json(
			{
				success: false,
				message: "Internal server error, please try again later.",
			},
			{
				status: 500,
			}
		);
	}
}
