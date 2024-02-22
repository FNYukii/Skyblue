import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "../../../utils/firebase"
import LikeButton from "../buttons/LikeButton"
import NavLinkToModal from "./NavLinkToModal"

interface Props {
	postId: string
	imageUrls: string[]
	className?: string
}

function ImageLinkGrid(props: Props) {

	return (

		<div className={props.className}>

			<div>

				{props.imageUrls.length === 1 &&

					<div className="w-full relative">

						<ImageLink postId={props.postId} imageUrls={props.imageUrls} imageIndex={0} />
						<LikeBar postId={props.postId} />
					</div>
				}



				{props.imageUrls.length === 2 &&

					<div className="w-full aspect-square   grid grid-cols-2 gap-2">

						<ImageLink postId={props.postId} imageUrls={props.imageUrls} imageIndex={0} />

						<div className="w-full relative">

							<ImageLink postId={props.postId} imageUrls={props.imageUrls} imageIndex={1} />
							<LikeBar postId={props.postId} />
						</div>
					</div>
				}



				{props.imageUrls.length === 3 &&

					<div className="w-full aspect-square   grid grid-cols-2 gap-2">

						<ImageLink postId={props.postId} imageUrls={props.imageUrls} imageIndex={0} />

						<div className="grid grid-rows-2 gap-2">

							<ImageLink postId={props.postId} imageUrls={props.imageUrls} imageIndex={1} />

							<div className="w-full relative">

								<ImageLink postId={props.postId} imageUrls={props.imageUrls} imageIndex={2} />
								<LikeBar postId={props.postId} />
							</div>
						</div>
					</div>
				}



				{props.imageUrls.length === 4 &&

					<div className="w-full aspect-square   grid grid-cols-2 gap-2">

						<ImageLink postId={props.postId} imageUrls={props.imageUrls} imageIndex={0} />
						<ImageLink postId={props.postId} imageUrls={props.imageUrls} imageIndex={1} />
						<ImageLink postId={props.postId} imageUrls={props.imageUrls} imageIndex={2} />

						<div className="w-full relative">

							<ImageLink postId={props.postId} imageUrls={props.imageUrls} imageIndex={3} />
							<LikeBar postId={props.postId} />
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default ImageLinkGrid



function ImageLink(props: { postId: string, imageIndex: number, imageUrls: string[] }) {

	return (
		<NavLinkToModal to={`/posts/${props.postId}/images/${props.imageIndex + 1}`} className="hover:brightness-90 transition">
			<img src={props.imageUrls[props.imageIndex]} alt="Attached on Post" className="w-full h-full aspect-square   object-cover bg-gray-200" />
		</NavLinkToModal>
	)
}



function LikeBar(props: { postId: string }) {

	const [isSignedIn, setIsSignedIn] = useState(false)

	useEffect(() => {

		// ログイン状態を取得
		onAuthStateChanged(auth, (user) => {

			if (user) setIsSignedIn(true)
			if (!user) setIsSignedIn(false)
		})
	}, [])

	return (
		<>
			{isSignedIn &&
				<div className="absolute bottom-0 right-0   w-full pt-4  flex justify-end   bg-gradient-to-t from-black/60 to-transparent   pointer-events-none">
					<LikeButton postId={props.postId} className="m-3   pointer-events-auto" />
				</div>
			}
		</>
	)
}