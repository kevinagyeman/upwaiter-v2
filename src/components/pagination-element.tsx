"use client";

import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious,
} from "@/components/ui/pagination";

export default function PaginationElement({
	currentPage,
	totalPages,
	paginationUrls,
}: any) {
	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<PaginationPrevious
						href={paginationUrls.previous || "#"}
						aria-disabled={!paginationUrls.previous}
						className={
							!paginationUrls.previous ? "opacity-50 cursor-not-allowed" : ""
						}
					/>
				</PaginationItem>
				{paginationUrls.pages.map((url: any, index: number) => (
					<PaginationItem key={index}>
						<PaginationLink href={url} isActive={currentPage === index + 1}>
							{index + 1}
						</PaginationLink>
					</PaginationItem>
				))}
				{totalPages > 5 && (
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
				)}
				<PaginationItem>
					<PaginationNext
						href={paginationUrls.next || "#"}
						aria-disabled={!paginationUrls.next}
						className={
							!paginationUrls.next ? "opacity-50 cursor-not-allowed" : ""
						}
					/>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
