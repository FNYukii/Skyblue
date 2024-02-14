import { useState, useEffect } from "react"
import Post from "../../entities/Post"
import PostService from "../../utils/PostService"
import PostList from "../components/others/PostList"
import Screen from "../components/others/Screen"



function TopScreen() {

	const [posts, setPosts] = useState<Post[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		(async () => {

			const posts = await PostService.readPosts()

			setPosts(posts)
			setIsLoaded(true)
		})()
	}, [])



	return (

		<Screen title="Skyblue">

			<PostList posts={posts} isLoaded={isLoaded} />
		</Screen>
	)
}

export default TopScreen