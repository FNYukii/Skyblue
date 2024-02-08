import Image from "./Image"

type User = {
	id: string
	createdAt: Date

	displayName: string
	icon: Image

	likes: string[]
}

export default User