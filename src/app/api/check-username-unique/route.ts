import dbConnection from "@/lib/dbConnect";
import { usernameValidation } from "@/schemas/signupSchema";
import { z } from "zod";
import User from "@/models/userModel";

const usernameQuerySchema = z.object({
	username: usernameValidation,
});

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
	await dbConnection();
	try {
		const { searchParams } = new URL(request.url);
		const queryParam = {
			username: searchParams.get("username"),
		};

		const result = usernameQuerySchema.safeParse(queryParam);
		console.log(result);

		if (!result.success) {
			const usernameErrors =
			result.error.format().username?._errors || [];

			return Response.json(
				{
					success: false,
					message:
						usernameErrors?.length > 0
							? usernameErrors.join(", ")
							: "Invalid username",
				},
				{
					status: 400,
				}
			);
		}

		const { username } = result.data;
		const existingVerifieduser = await User.findOne({
			username,
			isVerified: true,
		});

		if (existingVerifieduser) {
			return Response.json(
				{
					success: false,
					message: "Username already taken",
				},
				{
					status: 400,
				}
			);
		}

		return Response.json(
			{
				success: true,
				message: "Username is unique.",
			},
			{
				status: 200,
			}
		);
	} catch (error) {
		console.log("Error fetching username ", error);
		return Response.json(
			{
				success: false,
				message: "Failed fetching username",
			},
			{
				status: 500,
			}
		);
	}
}
