import { ApiResponse } from "@/types/ApiResponse";
import { verificationTemplate } from "../../emails/VerificationEmail";
import nodemailer from "nodemailer";

export async function sendVerificationEmail(
	email: string,
	username: string,
	verifyCode: string
): Promise<ApiResponse> {
	try {
		const transport = nodemailer.createTransport({
			host: process.env.MAIL_HOST,
			port: Number(process.env.MAIL_PORT),
			auth: {
				user: process.env.MAIL_USER,
				pass: process.env.MAIL_PASS,
			},
		});

		const mailOptions = {
			from: process.env.USER_MAIL,
			to: email,
			subject: "Flickr - Verify Your Email",
			html: verificationTemplate({ username, otp: verifyCode }),
		};

		const mailResponse = await transport.sendMail(mailOptions);
		return {
			success: true,
			message: "Verification email sent successfully",
		};
	} catch (error) {
		console.log("Error sending verification email", error);
		return {
			success: false,
			message: "Error sending verification email",
		};
	}
}
