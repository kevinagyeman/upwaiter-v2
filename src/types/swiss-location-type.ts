export interface Canton {
	key: string;
	name: string;
	shortName: string;
}

export interface District {
	key: string;
	name: string;
	shortName: string;
}

export interface Commune {
	key: string;
	historicalCode: string;
	name: string;
	shortName: string;
	district: District;
	canton: Canton;
}

// Array types for better type safety
export type Cantons = Canton[];
export type Districts = District[];
export type Communes = Commune[];
