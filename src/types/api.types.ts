// API Response Types
export interface PaginatedResponse<T> {
	data: T[];
	totalPages: number;
	currentPage: number;
	totalCount: number;
}

// Service layer response wrapper
export type ServiceResult<T> = T | undefined;

// API Error Types
export interface ApiError {
	message: string;
	status?: number;
	code?: string;
}
