import { useState, useEffect } from "react"
import Post from "../../entities/Post"
import PostService from "../../utils/PostService"
import Header from "../components/sections/Header"
import { GoogleMap, OverlayViewF, useJsApiLoader } from "@react-google-maps/api"
import NavLinkToModal from "../components/others/NavLinkToModal"



function MapScreen() {

	document.title = "マップ - Skyblue"

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

		<div className="w-screen h-screen   flex flex-col">

			<Header />

			<div className="grow">

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

					<PostMap posts={posts} className="w-full h-full" />
				}
			</div>
		</div>
	)
}

export default MapScreen



function PostMap(props: { posts: Post[], className?: string }) {

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_PLATFORM_API_KEY}`,
		language: "ja"
	})

	const defaultCenter = { lat: 35.1706763855153, lng: 136.88172646669815 }



	const [isDragged, setIsDragged] = useState(false)



	return (

		<div className={props.className}>

			{isLoaded &&
				<GoogleMap
					options={{
						disableDefaultUI: true,
						draggable: true,
						scrollwheel: true,
						clickableIcons: false
					}}
					center={!isDragged ? defaultCenter : undefined}
					zoom={8}
					mapContainerClassName="w-full h-full   min-w-40 min-h-40"

					onDrag={() => setIsDragged(true)}
				>

					{props.posts.map((post, index) => (

						<OverlayViewF
							key={index}
							position={post.location}
							mapPaneName={"floatPane"}
						>
							<NavLinkToModal to={`/posts/${post.id}/images/1`} className="block w-12 aspect-square   border border-2 border-white   rounded-full cursor-pointer overflow-hidden   group">

								<img
									src={post.images[0].url}
									alt="Attached on Post"
									className="w-full h-full   bg-gray-100   group-hover:brightness-90 transition"
								/>
							</NavLinkToModal>
						</OverlayViewF>
					))}
				</GoogleMap>
			}
		</div>
	)

}