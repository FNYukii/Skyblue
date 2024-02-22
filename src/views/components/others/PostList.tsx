import Skeleton from "react-loading-skeleton"
import Post from "../../../entities/Post"
import ImageLinkGrid from "./ImageLinkGrid"
import 'react-loading-skeleton/dist/skeleton.css'


interface Props {
	posts: Post[] | null
	isLoaded: boolean

	noResultMessage?: string

	className?: string
}



function PostList(props: Props) {

	return (

		<div className={props.className}>

			{!props.isLoaded &&

				<>

					<div className="grid md:hidden   grid-cols-2 gap-2">

						<SkeletonBox fourBoxes />
						<SkeletonBox />

						<SkeletonBox />
						<SkeletonBox fourBoxes />

						<SkeletonBox fourBoxes />
						<SkeletonBox />

						<SkeletonBox />
						<SkeletonBox fourBoxes />
					</div>

					<div className="hidden md:grid lg:hidden   grid-cols-3 gap-2">

						{Array(12).fill(0).map((_item, index) => (

							<div key={index}>
								{index % 2 === 0 &&
									<SkeletonBox fourBoxes />
								}

								{index % 2 !== 0 &&
									<SkeletonBox />
								}
							</div>
						))}
					</div>

					<div className="hidden lg:grid   grid-cols-4 gap-2">

						<SkeletonBox fourBoxes />
						<SkeletonBox />
						<SkeletonBox fourBoxes />
						<SkeletonBox />

						<SkeletonBox />
						<SkeletonBox fourBoxes />
						<SkeletonBox />
						<SkeletonBox fourBoxes />

						<SkeletonBox fourBoxes />
						<SkeletonBox />
						<SkeletonBox fourBoxes />
						<SkeletonBox />
					</div>
				</>
			}



			{props.isLoaded && props.posts === null &&
				<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
			}

			{props.isLoaded && props.posts !== null && props.posts.length === 0 &&
				<p className="mt-16   text-center text-gray-500">
					{!props.noResultMessage &&
						<span>投稿はありません</span>
					}

					{props.noResultMessage &&
						<span>{props.noResultMessage}</span>
					}
				</p>
			}



			{props.isLoaded && props.posts !== null && props.posts.length !== 0 &&

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-2">

					{props.posts.map((post, index) => (
						<ImageLinkGrid key={index} imageUrls={post.images.map(image => image.url)} postId={post.id} />
					))}
				</div>
			}
		</div>
	)
}

export default PostList



function SkeletonBox(props: { fourBoxes?: boolean }) {

	return (

		<div className="w-full aspect-square   overflow-hidden">

			{!props.fourBoxes &&
				<Skeleton width="100%" height="100%" className="block" />
			}

			{props.fourBoxes &&
				<div className="w-full h-full   grid grid-cols-2 gap-2">
					<Skeleton width="100%" height="100%" className="block" />
					<Skeleton width="100%" height="100%" className="block" />
					<Skeleton width="100%" height="100%" className="block" />
					<Skeleton width="100%" height="100%" className="block" />
				</div>
			}
		</div>
	)
}