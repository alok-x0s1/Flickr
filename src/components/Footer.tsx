import { Separator } from "./ui/separator";

function Footer() {
	return (
		<footer className="pb-24">
			<Separator />
			<div className="max-w-[85rem] mx-auto flex flex-wrap justify-between items-start gap-8 px-4 sm:px-6 lg:px-8 mt-14">
				<div>
					<div>
						<h2 className="text-lg font-semibold mb-4">
							About Whisper Box
						</h2>
						<p className="mb-4">
							Whisper Box is a community-driven platform where
							thoughts meet ideas, and conversations spark
							creativity. We empower users to share their stories,
							connect with others, and explore new perspectives in
							a safe and welcoming environment.
						</p>
					</div>
				</div>
				<div>
					<h2 className="text-lg font-semibold mb-4">
						Quick Links
					</h2>
					<ul>
						<li className="mb-2">
							<a
								href="#"
								className="hover:underline transition-all duration-300"
							>
								Home
							</a>
						</li>
						<li className="mb-2">
							<a
								href="#"
								className="hover:underline transition-all duration-300"
							>
								Explore
							</a>
						</li>
						<li className="mb-2">
							<a
								href="#"
								className="hover:underline transition-all duration-300"
							>
								Communities
							</a>
						</li>
						<li className="mb-2">
							<a
								href="#"
								className="hover:underline transition-all duration-300"
							>
								Contact
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h2 className="text-lg font-semibold mb-4">
						Stay Connected
					</h2>
					<div className="flex space-x-4">
						<a
							href="#"
							className="hover:underline transition-all duration-300"
						>
							Twitter
						</a>
						<a
							href="#"
							className="hover:underline transition-all duration-300"
						>
							LinkedIn
						</a>
						<a
							href="#"
							className="hover:underline transition-all duration-300"
						>
							Instagram
						</a>
					</div>
				</div>
				<div>
					<div>
						<h2 className="text-lg font-semibold mb-4">
							Get in Touch
						</h2>
						<p>New York, USA</p>
						<p>NY 10001</p>
						<p>Email: support@whisperboxnx.com</p>
						<p>Phone: (987) 654-3210</p>
					</div>
				</div>
			</div>
			<p className="text-center text-sm pt-6 text-gray-500">
				© 2024 Whisper Box. All rights reserved.
			</p>
		</footer>
	);
}

export default Footer;
