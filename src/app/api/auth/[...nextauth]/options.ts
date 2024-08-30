import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import dbConnection from "@/lib/dbConnect";
import User from "@/models/userModel";

export const authOptions: NextAuthOptions = {
	providers: [
		CredentialsProvider({
			id: "credentials",
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					required: true,
					placeholder: "Enter your email",
				},
				password: {
					label: "Password",
					type: "password",
					required: true,
					placeholder: "Enter your password",
				},
			},
			async authorize(credentials: any): Promise<any> {
				await dbConnection();

				try {
					const user = await User.findOne({
						$or: [
							{ email: credentials.identifier },
							{ username: credentials.identifier },
						],
					});
					if (!user) {
						throw new Error("User not found");
					}

					if (!user.isVerified) {
						throw new Error("Please verify your account");
					}

					const isPasswordCorrect = await bcrypt.compare(
						credentials.password,
						user.password
					);
					if (isPasswordCorrect) {
						return user;
					} else {
						throw new Error("Invalid password");
					}
				} catch (error) {
					throw new Error("Failed to authorize user");
				}
			},
		}),
	],
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token._id = user?._id?.toString();
				token.username = user.username;
				token.isVerified = user.isVerified;
				token.isAcceptingMessage = user.isAcceptingMessage;
			}
			return token;
		},

		async session({ session, token }) {
			if (token) {
				session.user._id = token._id;
				session.user.username = token.username;
				session.user.isVerified = token.isVerified;
				session.user.isAcceptingMessage = token.isAcceptingMessage;
			}
			return session;
		},
	},
	pages: {
		signIn: "/sign-in",
	},
	session: {
		strategy: "jwt",
	},
	secret: process.env.NEXTAUTH_SECRET,
};
