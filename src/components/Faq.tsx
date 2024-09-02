import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
	{
		id: "item-1",
		question: "What is Whisper Box?",
		answer: "Whisper Box is a secure platform that allows users to anonymously share feedback, suggestions, and ideas in a private and protected environment.",
	},
	{
		id: "item-2",
		question: "How does Whisper Box ensure anonymity?",
		answer: "We use advanced encryption and secure data storage to guarantee that your identity remains anonymous. No personal information is linked to your feedback.",
	},
	{
		id: "item-3",
		question: "Can I use Whisper Box for team collaboration?",
		answer: "Absolutely! Whisper Box is designed to facilitate open communication and collaboration within teams by allowing members to share ideas and concerns anonymously.",
	},
	{
		id: "item-4",
		question: "Is Whisper Box free to use?",
		answer: "Yes, Whisper Box offers a free tier with basic features. However, we also offer premium plans with advanced features for teams and organizations.",
	},
	{
		id: "item-5",
		question: "How do I get started?",
		answer: "Getting started with Whisper Box is simple. Sign up for a free account, set up your profile, and start sharing your thoughts anonymously.",
	},
];

export function Faq() {
	return (
		<Accordion type="single" collapsible className="w-[80rem]">
			{faqs.map((faq) => (
				<AccordionItem key={faq.id} value={faq.id}>
					<AccordionTrigger>{faq.question}</AccordionTrigger>
					<AccordionContent>{faq.answer}</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	);
}
