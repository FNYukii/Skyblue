import { useEffect, useState } from "react"
import Post from "../../../entities/Post"
import PostList from "../others/PostList"
import PostService from "../../../utils/PostService"
import { Unsubscribe } from "firebase/firestore"



interface Props {
	userId: string
	className?: string
}



function LikePostList(props: Props) {

	const [posts, setPosts] = useState<Post[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await PostService.onLikesByUserChanged(props.userId, posts => {

				setPosts(posts)
				setIsLoaded(true)

			}, (error) => {

				setIsLoaded(true)
			})
		})()

		return () => {
			if (unsubscribe) unsubscribe()
		}

		// eslint-disable-next-line
	}, [])


	return (
		<PostList posts={posts} isLoaded={isLoaded} className="mt-4" />
	)
}

export default LikePostList