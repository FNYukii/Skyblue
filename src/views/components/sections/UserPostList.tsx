import { useEffect, useState } from "react"
import Post from "../../../entities/Post"
import PostService from "../../../utils/PostService"
import { Unsubscribe } from "firebase/firestore"
import PostList from "../others/PostList"



interface Props {
	userId: string
	className?: string
}



function UserPostList(props: Props) {

	const [posts, setPosts] = useState<Post[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await PostService.onPostsByUserChanged(props.userId, posts => {

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
		<PostList posts={posts} isLoaded={isLoaded} className="mt-4"/>
	)
}

export default UserPostList