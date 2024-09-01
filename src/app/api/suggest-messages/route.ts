import OpenAi from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";

const openai = new OpenAi({
	apiKey: process.env.OPENAI_API_KEY,
});
export const runtime = "edge";

export async function POST(req: Request) {
	try {
		const prompt = `Generate three open-ended and engaging questions formatted as a single string. Each question should be separated by '||'. These questions are intended for an anonymous social messaging platform similar to Qooh.me. They should be appropriate for a broad audience and should not touch on personal or sensitive subjects. Focus on universal themes that stimulate curiosity and encourage positive interaction. For instance, format the output like this: 'What’s a new hobby you’ve recently picked up?||If you could have dinner with anyone from history, who would it be and why?||What’s a simple pleasure that always brings you joy?'. The questions should be thought-provoking and conducive to friendly and welcoming conversations.`;

		const response = await openai.completions.create({
			model: "gpt-3.5-turbo-instruct",
			max_tokens: 100,
			stream: true,
			prompt,
		});

		const stream = OpenAIStream(response);
		return new StreamingTextResponse(stream);
	} catch (error) {
		if (error instanceof OpenAi.APIError) {
			const { name, message, headers, status } = error;
			return Response.json(
				{
					success: false,
					message: `OpenAI API Error: ${name} - ${message}`,
					statusCode: status,
					headers,
				},
				{
					status,
				}
			);
		} else {
			console.log("Unexpected error occurred : ", error);
			throw error;
		}
	}
}
