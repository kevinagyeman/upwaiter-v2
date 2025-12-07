export interface Location {
	id: string;
	country: string;
	isoCode: string;
	state: string | null;
	region: string | null;
	province: string | null;
	county: string | null;
	canton: string | null;
	district: string | null;
	municipality: string | null;
	city: string | null;
	neighborhood: string | null;
	postalCode: string | null;
	latitude: number | null;
	longitude: number | null;
	streetAddress: string | null;
}
