import type { ReactNode } from "react";
import type { JobPostWithRelations } from "./domain.types";

// Common component props
export interface ErrorProps {
	children: ReactNode;
	className?: string;
}

// Job post component props
export interface JobPostFooterProps {
	jobPost: JobPostWithRelations;
	companyId?: string;
}

// Pagination types
export interface PaginationData {
	totalPages: number;
	currentPage: number;
	totalCount: number;
	pages: Array<{ page: number; url: string }>;
}

export interface PaginationProps {
	paginationUrls: PaginationData;
}
