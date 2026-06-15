import { ElementType, ComponentPropsWithoutRef, ReactNode } from "react";
import { LoadingIcon } from "../loading-icon";
import { App } from "../../interface/app";
import { cn } from "../../utils";

type Variant =
	| "primary"
	| "secondary"
	| "destructive"
	| "positive"
	| "light"
	| "burn";

type ButtonOwnProps<E extends ElementType = "button"> = {
	as?: E;
	app?: App;
	size?: "sm" | "default" | "icon";
	variant?: Variant;
	rightIcon?: ReactNode;
	leftIcon?: ReactNode;
	isLoading?: boolean;
	showChildrenWhenLoading?: boolean;
	withBorder?: boolean;
};

export type ButtonProps<E extends ElementType = "button"> = ButtonOwnProps<E> &
	Omit<ComponentPropsWithoutRef<E>, keyof ButtonOwnProps<E>>;

const getBaseClassName = (app: App, variant: Variant) => {
	if (variant === "destructive") {
		return "bg-system-red hover:bg-[#BF0A00] active:bg-system-red";
	}

	if (variant === "burn") {
		return "bg-red-0 text-red-main hover:bg-red-1 active:bg-red-0";
	}

	if (variant === "positive") {
		return "bg-system-green hover:bg-[#2B8F00] active:bg-system-green";
	}

	if (variant === "light") {
		return "bg-paper-main text-surface-ink border-surface-ink hover:bg-paper-2 active:bg-paper-main";
	}

	if (app === "fund") {
		if (variant === "primary") {
			return "bg-core-orange hover:bg-orange-1 active:bg-core-orange";
		}

		return "bg-[#FBDED1] text-core-orange hover:bg-[#FFF1EA] active:bg-[#FBDED1]";
	}

	if (app === "stacks") {
		if (variant === "primary") {
			return "bg-primary-blue hover:bg-blue-2 active:bg-primary-blue";
		}

		return "bg-[#B9D5FF] text-primary-blue hover:bg-[#99C2FF] active:bg-[#B9D5FF]";
	}

	if (variant === "primary") {
		return "bg-primary-jade hover:bg-jade-2 active:bg-primary-jade";
	}

	return "bg-[#CBE9E5] text-primary-jade hover:bg-[#BCD9D5] active:bg-[#CBE9E5]";
};

const Button = <E extends ElementType = "button">({
	as,
	app = "fund",
	size,
	variant = "primary",
	rightIcon,
	leftIcon,
	children,
	disabled,
	className,
	isLoading,
	showChildrenWhenLoading,
	withBorder,
	...rest
}: ButtonProps<E>) => {
	const Component = as ?? "button";

	return (
		<Component
			{...rest}
			className={cn(
				"text-paper-main",
				"href" in (rest as Record<string, unknown>)
					? "cursor-pointer"
					: "",
				getBaseClassName(app, variant),
				"flex items-center justify-center gap-2 active:shadow-none disabled:shadow-none disabled:bg-surface-grey disabled:cursor-not-allowed",
				"transition-all duration-200 border disabled:border-transparent",
				variant !== "light" && withBorder && "border-surface-ink",
				variant !== "light" && !withBorder && "border-transparent",
				size === "icon"
					? "p-2.5"
					: size === "sm"
						? "py-1 px-4"
						: "py-4 px-8",
				size === "sm"
					? "shadow-[0.125rem_0.125rem_0px_0px_#595959]"
					: "shadow-[0.25rem_0.25rem_0px_0px_#595959]",
				className,
			)}
			disabled={disabled || isLoading}
		>
			{(!isLoading || (isLoading && showChildrenWhenLoading)) && (
				<>
					{leftIcon}
					{children}
					{rightIcon}
				</>
			)}
			{isLoading && <LoadingIcon app={app} />}
		</Component>
	);
};

export default Button;
