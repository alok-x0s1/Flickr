import dbConnection from "@/lib/dbConnect";
import User from "@/models/userModel";

export async function POST(request: Request) {
	await dbConnection();
	try {
		const { username, code } = await request.json();
		const decodedUsername = decodeURIComponent(username);

		const user = await User.findOne({ username: decodedUsername });
		if (!user) {
			return Response.json(
				{
					success: false,
					message: "User not found.",
				},
				{
					status: 400,
				}
			);
		}

		const isCodeValid = user.verifyCode === code;
		const isCodeNotExpired = new Date(user.verifyCodeExpiry) > new Date();

		if (isCodeValid && isCodeNotExpired) {
			user.isVerified = true;
			await user.save();

			return Response.json(
				{
					success: true,
					message: "Your Whisper box account verified successfully.",
				},
				{
					status: 200,
				}
			);
		} else if (!isCodeNotExpired) {
			return Response.json(
				{
					success: false,
					message:
						"Verification code has expired, Please signup again to get a new code.",
				},
				{
					status: 400,
				}
			);
		} else {
			return Response.json(
				{
					success: false,
					message: "Incorrect verification code, Please try again.",
				},
				{
					status: 400,
				}
			);
		}
	} catch (error) {
		return Response.json(
			{
				success: false,
				message: "Error verifying user.",
			},
			{
				status: 500,
			}
		);
	}
}
