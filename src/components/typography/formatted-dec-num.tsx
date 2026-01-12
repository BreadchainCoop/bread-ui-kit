import { cn } from "../../utils";
import { formatBalance } from "../../utils/formatter";
import { Logo } from "../Logo";
import { Body } from "./Typography";

interface FormattedDecimalNumberProps {
	value: number | string;
	className?: string;
	integralPartClassName?: string;
	decimalPartClassName?: string;
	withBreadIcon?: boolean;
	breadIconClassName?: string;
	breadSize?: number;
}

export function FormattedDecimalNumber({
	value,
	className,
	integralPartClassName,
	decimalPartClassName,
	withBreadIcon,
	breadIconClassName,
	breadSize = 24,
}: FormattedDecimalNumberProps) {
	const parsedValue = typeof value === "number" ? value : parseFloat(value);
	const formattedValue = formatBalance(parsedValue, 2);

	const [integerPart, decimalPart] = formattedValue.split(".");

	return (
		<div className="inline-flex items-center justify-start gap-2">
			{withBreadIcon && (
				<Logo className={breadIconClassName} size={breadSize} />
			)}
			<Body
				bold
				className={cn(withBreadIcon && "mt-[0.2rem]", className)}
			>
				<span className={cn("text-base", integralPartClassName)}>
					{integerPart}
				</span>
				<span className={cn("text-xs", decimalPartClassName)}>
					.{decimalPart}
				</span>
			</Body>
		</div>
	);
}
