import type { ReactNode } from "react";

interface FormErrorProps {
	children: ReactNode;
}

export default function FormError({ children }: FormErrorProps) {
	return (
		<>{children && <span className="text-red-500 text-sm">{children}</span>}</>
	);
}
