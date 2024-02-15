import { useState, useEffect } from "react"
import Post from "../../entities/Post"
import PostService from "../../utils/PostService"
import Screen from "../components/others/Screen"
import GMap from "../components/others/GMap"

function MapScreen() {

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

		<Screen title="マップ - Skyblue">

			{!isLoaded &&
				<div className="w-full h-full bg-gray-100" />
			}

			{isLoaded && posts === null &&
				<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
			}

			{isLoaded && posts !== null && posts.length === 0 &&
				<p className="mt-16   text-center text-gray-500">投稿はありません</p>
			}



			{isLoaded && posts !== null && posts.length !== 0 &&

				<GMap
					locations={posts.map(post => post.location)}
					center={{ lat: 35.1706763855153, lng: 136.88172646669815 }}
					zoom={7}
					draggable
					scrollable
					className="w-full aspect-video"
				/>
			}
		</Screen>
	)
}

export default MapScreen