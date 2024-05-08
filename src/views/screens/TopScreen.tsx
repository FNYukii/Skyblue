import { useState, useEffect } from "react"
import Post from "../../entities/Post"
import PostService from "../../utils/PostService"
import PostList from "../components/others/PostList"
import Screen from "../components/others/Screen"
import { Unsubscribe } from "firebase/firestore"



function TopScreen() {

	const [posts, setPosts] = useState<Post[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await PostService.onPostsChanged(posts => {

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

		<Screen title="Skyblue">

			<PostList posts={posts} isLoaded={isLoaded} />
		</Screen>
	)
}

export default TopScreen