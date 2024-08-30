import dbConnection from "@/lib/dbConnect";
import { getServerSession, User } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";
import UserModel from "@/models/userModel";

export async function DELETE(
	request: Request,
	{ params }: { params: { messageId: string } }
) {
	const messageId = params.messageId;
	await dbConnection();

	const session = await getServerSession(authOptions);
	const user = session?.user as User;

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
		const updatedResult = await UserModel.updateOne(
			{
				_id: user._id,
			},
			{
				$pull: {
					messages: { _id: messageId },
				},
			},
		);

		if (updatedResult.modifiedCount === 0) {
			return Response.json(
				{
					success: false,
					message: "Message not found.",
				},
				{
					status: 404,
				}
			);
		}

		return Response.json(
			{
				success: true,
				message: "Message deleted successfully.",
			},
			{
				status: 200,
			}
		);
	} catch (error) {
        console.log("Error deleting message ", error);
		return Response.json(
			{
				success: false,
				message: "Error deleting message.",
			},
			{
				status: 500,
			}
		);
	}
}
