import { HoverEffect } from "./ui/card-hover-effect";

export function Testimonials() {
	return (
		<div className="mx-auto px-8">
			<HoverEffect items={testimonials} />
		</div>
	);
}
export const testimonials = [
	{
		name: "John Doe",
		title: "CEO of Whisper Solutions",
		testimonial:
			"Whisper Box has revolutionized the way we receive feedback from our clients. The anonymity it provides has allowed for more honest and constructive communication, helping us improve our services immensely.",
		company: "Whisper Solutions",
        link: "#"
	},
	{
		name: "Jane Smith",
		title: "Product Manager at InnovateTech",
		testimonial:
			"The user experience on Whisper Box is exceptional. It's intuitive, secure, and has become an integral part of how we gather insights from our team anonymously.",
		company: "InnovateTech",
        link: "#"
	},
	{
		name: "Michael Brown",
		title: "CTO at FutureWorks",
		testimonial:
			"As someone who values privacy and security, I can't recommend Whisper Box enough. It’s the perfect tool for anonymous communication, and the platform's reliability is unmatched.",
		company: "FutureWorks",
        link: "#"
	},
	{
		name: "Emily White",
		title: "Head of HR at PeopleFirst",
		testimonial:
			"Whisper Box has made it easier for our employees to share their thoughts and concerns without fear. It's an invaluable tool for maintaining a transparent and open work environment.",
		company: "PeopleFirst",
        link: "#"
	},
	{
		name: "David Green",
		title: "Marketing Director at Creative Minds",
		testimonial:
			"The suggestions feature on Whisper Box is a game-changer. It helps our team start conversations more easily, leading to more meaningful and productive discussions.",
		company: "Creative Minds",
        link: "#"
	},
	{
		name: "Sarah Johnson",
		title: "Founder of FeedbackPro",
		testimonial:
			"Whisper Box has been instrumental in gathering candid feedback from our customers. It’s helped us refine our offerings and better understand the needs of our audience.",
		company: "FeedbackPro",
        link: "#"
	},
];
