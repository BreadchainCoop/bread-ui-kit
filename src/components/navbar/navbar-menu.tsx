"use client";

import { ReactNode, useRef } from "react";
import { ListIcon, XIcon } from "@phosphor-icons/react/dist/ssr";

interface NavbarMenuProps {
	textClassName: string;
	mobileHeader: ReactNode;
	children: ReactNode;
	footer?: ReactNode;
}

export function NavbarMenu({
	textClassName,
	mobileHeader,
	children,
	footer,
}: NavbarMenuProps) {
	const menuRef = useRef<HTMLDivElement>(null);

	const toggleMenu = (close = false) => {
		if (close) {
			menuRef.current?.classList.remove("translate-x-0!");

			return;
		}

		menuRef.current?.classList.toggle("translate-x-0!");
	};

	return (
		<>
			<button
				onClick={() => toggleMenu()}
				className={`ml-auto relative w-10 h-10 flex flex-col items-center justify-center space-y-1.5 focus:outline-none group md:hidden ${textClassName}`}
				aria-label="Toggle menu"
			>
				<ListIcon size={32} />
			</button>
			<div
				ref={menuRef}
				className="bg-paper-main fixed overflow-y-scroll top-0 left-0 z-50 h-screen w-screen py-2.5 px-6 transition-transform translate-x-full md:static md:h-auto md:w-auto md:translate-x-0 md:py-0 md:px-0 md:flex md:items-center md:justify-end md:overflow-x-visible md:overflow-y-visible md:transition-none md:z-auto"
			>
				<div className="flex items-center justify-between mb-6 md:hidden">
					{mobileHeader}
					<button
						className={`z-60 h-8 w-8 ml-auto block md:hidden ${textClassName}`}
						onClick={() => toggleMenu(true)}
					>
						<XIcon size={32} />
					</button>
				</div>
				<div onClick={() => toggleMenu(true)}>{children}</div>
				{footer}
			</div>
		</>
	);
}
