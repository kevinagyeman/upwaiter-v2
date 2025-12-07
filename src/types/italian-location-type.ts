// Italian location types
export interface Coordinates {
	lat: number;
	lng: number;
}

export interface Provincia {
	nome: string;
	sigla: string;
	codice: string;
	regione: string;
}

export interface Municipality {
	codice: string;
	nome: string;
	nomeStraniero: string | null;
	codiceCatastale: string;
	cap: string;
	prefisso: string;
	email: string;
	pec: string;
	telefono: string;
	fax: string | null;
	coordinate: Coordinates;
	provincia: Provincia;
	popolazione: number;
}

// Simplified types for form usage
export interface Region {
	name: string;
}

export interface Province {
	name: string;
	code: string;
	region: string;
}

export interface Municipality {
	name: string;
	province: string;
	region: string;
	code: string;
}

// Array types
export type Regions = Region[];
export type Provinces = Province[];
export type Municipalities = Municipality[];
