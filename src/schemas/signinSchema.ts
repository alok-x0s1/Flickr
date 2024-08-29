import { z } from "zod";

export const signinSchema = z.object({
	identifier: z.string(),
	password: z.string().min(8, "password must be at least 8 characters"),
});
