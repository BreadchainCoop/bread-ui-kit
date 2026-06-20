import { App } from "../../interface/app";
import { cn } from "../../utils";

export function LoadingIcon({
	app,
	className,
}: {
	app: App;
	className?: string;
}) {
	return (
		<div className={cn("relative w-8 h-8", className)}>
			<svg
				className="w-full h-full transform -rotate-90"
				viewBox="0 0 120 120"
			>
				<circle
					cx="60"
					cy="60"
					r="50"
					fill="none"
					strokeWidth="20"
					className={
						app === "fund"
							? "stroke-orange-2"
							: app === "stacks"
								? "stroke-[#B9D5FF]"
								: "stroke-[#CBE9E5]"
					}
				/>
				<circle
					cx="60"
					cy="60"
					r="50"
					fill="none"
					strokeWidth="20"
					strokeDasharray="314"
					strokeDashoffset="235"
					strokeLinecap="round"
					className={cn(
						"origin-center animate-spin",
						app === "fund"
							? "stroke-orange-0"
							: app === "stacks"
								? "stroke-primary-blue"
								: "stroke-primary-jade",
					)}
					style={{ animationDuration: "2s" }}
				/>
			</svg>
		</div>
	);
}
