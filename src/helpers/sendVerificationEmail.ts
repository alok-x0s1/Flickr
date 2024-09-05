import { ApiResponse } from "@/types/ApiResponse";
import resend from "@/lib/resend";
import VerificationEmail from "../../emails/VerificationEmail";

export async function sendVerificationEmail(
	email: string,
	username: string,
	verifyCode: string
): Promise<ApiResponse> {
	try {
		await resend.emails.send({
			from: "whisperBox@business.com",
			to: email,
			subject: "Whisper Box - Verify Your Email",
			react: VerificationEmail({ username, otp: verifyCode }),
		});
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
