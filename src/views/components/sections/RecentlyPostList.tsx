import { useEffect, useState } from "react"
import Post from "../../../entities/Post"
import PostService from "../../../utils/PostService"
import PostList from "../others/PostList"



interface Props {
	className?: string
}



function RecentlyPostList(props: Props) {

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
		<PostList posts={posts} isLoaded={isLoaded} className={props.className} />
	)
}

export default RecentlyPostList