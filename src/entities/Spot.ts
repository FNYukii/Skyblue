type Spot = {
	id: string
	userId: string
	createdAt: Date

	imageUrls: string[]
	location: number[]
	name: string
	detail: string

	likedUserIds: string[]
}

export default Spot