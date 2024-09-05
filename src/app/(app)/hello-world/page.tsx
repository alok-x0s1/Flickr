import { orbitron } from "@/data/font";
import { cn } from "@/lib/utils";

const HelloWorld = () => {
	return (
		<div className="flex items-center justify-center min-h-screen">
			<div className="text-center p-10 max-w-md mx-auto">
				<h1
					className={cn(
						"text-5xl font-extrabold drop-shadow-lg animate-pulse",
						orbitron.className
					)}
				>
					Hello, World!
				</h1>
			</div>
		</div>
	);
};

export default HelloWorld;
