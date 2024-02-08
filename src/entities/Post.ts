import Image from "./Image"

type Post = {
	id: string
	userId: string
	createdAt: Date

	images: Image[]
	location: {lat: number, lng: number}
	name: string
	detail: string
}

export default Post