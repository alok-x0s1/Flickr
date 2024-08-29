import mongoose, { Schema, Document } from "mongoose";

export interface Message extends Document {
	content: string;
	createdAt: Date;
}

const messageSchema: Schema<Message> = new Schema({
	content: {
		type: String,
		required: true,
	},
	createdAt: {
		type: Date,
		default: Date.now,
	},
});

export interface User extends Document {
	username: string;
	messages: Message[];
	email: string;
	password: string;
	verifyCode: string;
	verifyCodeExpiry: Date;
	isVerified: boolean;
	isAcceptingMessage: boolean;
}

const userSchema: Schema<User> = new Schema({
	username: {
		type: String,
		required: [true, "username is required."],
		unique: true,
		trim: true,
	},
	messages: [messageSchema],
	email: {
		type: String,
		required: [true, "Email is required."],
		unique: true,
		match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format."],
	},
	password: {
		type: String,
		required: [true, "Password is required."],
	},
	verifyCode: {
		type: String,
		required: [true, "Verify code is required."],
	},
	verifyCodeExpiry: {
		type: Date,
		required: [true, "Verify code expiry is required."],
	},
	isAcceptingMessage: {
		type: Boolean,
		default: true,
	},
	isVerified: {
		type: Boolean,
		default: false,
	},
});

const User =
	(mongoose.models.User as mongoose.Model<User>) ||
	mongoose.model<User>("User", userSchema);

export default User;
