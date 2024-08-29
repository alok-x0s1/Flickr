import { z } from "zod";

export const usernameValidation = z
	.string()
	.min(3, "Username must be at least 3 characters")
	.max(20, "Username must be at least 20 characters")
	.regex(/^[a-zA-Z0-9_]+$/, "Username must not contain special characters");

export const signupSchema = z.object({
	username: usernameValidation,
	email: z.string().email({ message: "Invalid email address." }),
	password: z.string().min(8, "Password must be at least 8 characters"),
});
