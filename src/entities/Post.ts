type Post = {
	id: string
	userId: string
	createdAt: Date

	imageUrls: string[]
	location: {lat: number, lng: number}
	name: string
	detail: string
}

export default Post