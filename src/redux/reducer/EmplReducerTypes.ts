export type filterEmplsPayloadType = {
	role: string,
	sortBy: {
		birthdate: boolean,
		name: boolean,
		isArchived: boolean,
	},
}