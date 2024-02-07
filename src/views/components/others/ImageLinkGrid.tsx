import LikeButton from "../buttons/LikeButton"
import NavLinkToModal from "./NavLinkToModal"

interface Props {
	spotId: string
	imageUrls: string[]
	className?: string
}

function ImageLinkGrid(props: Props) {

	return (

		<div className={props.className}>

			<div>

				{props.imageUrls.length === 1 &&

					<div className="w-full relative">

						<ImageLink spotId={props.spotId} imageUrls={props.imageUrls} imageIndex={0} />
						<LikeBar spotId={props.spotId} />
					</div>
				}



				{props.imageUrls.length === 2 &&

					<div className="w-full aspect-square   grid grid-cols-2 gap-2">

						<ImageLink spotId={props.spotId} imageUrls={props.imageUrls} imageIndex={0} />

						<div className="w-full relative">

							<ImageLink spotId={props.spotId} imageUrls={props.imageUrls} imageIndex={1} />
							<LikeBar spotId={props.spotId} />
						</div>
					</div>
				}



				{props.imageUrls.length === 3 &&

					<div className="w-full aspect-square   grid grid-cols-2 gap-2">

						<ImageLink spotId={props.spotId} imageUrls={props.imageUrls} imageIndex={0} />

						<div className="grid grid-rows-2 gap-2">

							<ImageLink spotId={props.spotId} imageUrls={props.imageUrls} imageIndex={1} />

							<div className="w-full relative">

								<ImageLink spotId={props.spotId} imageUrls={props.imageUrls} imageIndex={2} />
								<LikeBar spotId={props.spotId} />
							</div>
						</div>
					</div>
				}



				{props.imageUrls.length === 4 &&

					<div className="w-full aspect-square   grid grid-cols-2 gap-2">

						<ImageLink spotId={props.spotId} imageUrls={props.imageUrls} imageIndex={0} />
						<ImageLink spotId={props.spotId} imageUrls={props.imageUrls} imageIndex={1} />
						<ImageLink spotId={props.spotId} imageUrls={props.imageUrls} imageIndex={2} />

						<div className="w-full relative">

							<ImageLink spotId={props.spotId} imageUrls={props.imageUrls} imageIndex={3} />
							<LikeBar spotId={props.spotId} />
						</div>
					</div>
				}
			</div>
		</div>
	)
}

export default ImageLinkGrid



function ImageLink(props: { spotId: string, imageIndex: number, imageUrls: string[] }) {

	return (
		<NavLinkToModal to={`/spots/${props.spotId}/images/${props.imageIndex + 1}`} className="hover:brightness-90 transition">
			<img src={props.imageUrls[props.imageIndex]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
		</NavLinkToModal>
	)
}



function LikeBar(props: { spotId: string }) {

	return (
		<div className="absolute bottom-0 right-0   w-full pt-4  flex justify-end   bg-gradient-to-t from-black/60 to-transparent   pointer-events-none">
			<LikeButton spotId={props.spotId} className="m-3   pointer-events-auto" />
		</div>
	)
}