import { sendVerificationEmail } from "@/helpers/sendVerificationEmail";
import dbConnection from "@/lib/dbConnect";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";

export async function POST(request: Request) {
	await dbConnection();

	try {
		const { username, email, password } = await request.json();
		const existingUserVerified = await User.findOne({
			username,
			isVerified: true,
		});

		if (existingUserVerified) {
			return Response.json(
				{
					success: false,
					message: "User already exists and is verified",
				},
				{ status: 400 }
			);
		}

		const existingUserByEmail = await User.findOne({
			email,
		});
		const verifyCode = Math.floor(
			100000 + Math.random() * 900000
		).toString();

		if (existingUserByEmail) {
			if (existingUserByEmail.isVerified) {
				return Response.json(
					{
						success: false,
						message: "User already exists with the provided email",
					},
					{ status: 400 }
				);
			} else {
				const hashedPassword = await bcrypt.hash(password, 10);
				existingUserByEmail.password = hashedPassword;
				existingUserByEmail.verifyCode = verifyCode;
				existingUserByEmail.verifyCodeExpiry = new Date(
					Date.now() + 3600000
				);

				await existingUserByEmail.save();
			}
		} else {
			const hashedPassword = await bcrypt.hash(password, 10);
			const expiryDate = new Date();
			expiryDate.setHours(expiryDate.getHours() + 1);

			const newUser = new User({
				username,
				email,
				password: hashedPassword,
				verifyCode,
				verifyCodeExpiry: expiryDate,
				isVerified: false,
				isAcceptingMessage: true,
				messages: [],
			});
			await newUser.save();
		}

		const emailResponse = await sendVerificationEmail(
			email,
			username,
			verifyCode
		);
		if (!emailResponse.success) {
			return Response.json(
				{
					success: false,
					message: "Failed to send verification email",
				},
				{ status: 500 }
			);
		}

		return Response.json(
			{
				success: true,
				message:
					"User registered successfully. Please verify your email",
			},
			{ status: 200 }
		);
	} catch (error) {
		console.log(error);
		return Response.json(
			{
				success: false,
				message: "Error registering user",
			},
			{
				status: 500,
			}
		);
	}
}
