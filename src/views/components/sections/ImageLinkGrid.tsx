import LikeButton from "../parts/LikeButton"
import NavLinkToModal from "../parts/NavLinkToModal"

interface Props {
	spotId: string
	imagesUrls: string[]
	className?: string
}

function ImageLinkGrid(props: Props) {

	return (

		<div className={props.className}>

			<div>

				{props.imagesUrls.length === 1 &&

					<div className="w-full relative">

						<NavLinkToModal to={`/spots/${props.spotId}/images/1`} className="block   w-full aspect-square   hover:brightness-90 transition">
							<img src={props.imagesUrls[0]} alt="Attached on Spot" className="h-full w-full   object-cover bg-gray-200" />
						</NavLinkToModal>

						<LikeBar spotId={props.spotId} />
					</div>
				}



				{props.imagesUrls.length === 2 &&

					<div className="w-full aspect-square   grid grid-cols-2 gap-2">

						<NavLinkToModal to={`/spots/${props.spotId}/images/1`} className="hover:brightness-90 transition">
							<img src={props.imagesUrls[0]} alt="Attached on Spot" className="h-full w-full   object-cover bg-gray-200" />
						</NavLinkToModal>

						<div className="w-full relative">

							<NavLinkToModal to={`/spots/${props.spotId}/images/2`} className="hover:brightness-90 transition">
								<img src={props.imagesUrls[1]} alt="Attached on Spot" className="h-full w-full   object-cover bg-gray-200" />
							</NavLinkToModal>

							<LikeBar spotId={props.spotId} />
						</div>
					</div>
				}



				{props.imagesUrls.length === 3 &&

					<div className="w-full aspect-square   grid grid-cols-2 gap-2">

						<NavLinkToModal to={`/spots/${props.spotId}/images/1`} className="hover:brightness-90 transition">
							<img src={props.imagesUrls[0]} alt="Attached on Spot" className="h-full w-full  object-cover bg-gray-200" />
						</NavLinkToModal>

						<div className="grid grid-rows-2 gap-2">

							<NavLinkToModal to={`/spots/${props.spotId}/images/2`} className="hover:brightness-90 transition">
								<img src={props.imagesUrls[1]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
							</NavLinkToModal>

							<div className="w-full relative">

								<NavLinkToModal to={`/spots/${props.spotId}/images/3`} className="hover:brightness-90 transition">
									<img src={props.imagesUrls[2]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
								</NavLinkToModal>

								<LikeBar spotId={props.spotId} />
							</div>
						</div>
					</div>
				}



				{props.imagesUrls.length === 4 &&

					<div className="w-full aspect-square   grid grid-cols-2 gap-2">

						<NavLinkToModal to={`/spots/${props.spotId}/images/1`} className="hover:brightness-90 transition">
							<img src={props.imagesUrls[0]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
						</NavLinkToModal>

						<NavLinkToModal to={`/spots/${props.spotId}/images/2`} className="hover:brightness-90 transition">
							<img src={props.imagesUrls[1]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
						</NavLinkToModal>

						<NavLinkToModal to={`/spots/${props.spotId}/images/3`} className="hover:brightness-90 transition">
							<img src={props.imagesUrls[2]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
						</NavLinkToModal>

						<div className="w-full relative">

							<NavLinkToModal to={`/spots/${props.spotId}/images/4`} className="hover:brightness-90 transition">
								<img src={props.imagesUrls[3]} alt="Attached on Spot" className="w-full h-full aspect-square   object-cover bg-gray-200" />
							</NavLinkToModal>

							<LikeBar spotId={props.spotId} />
						</div>
					</div>
				}
			</div>
		</div>
	)
}



function LikeBar(props: { spotId: string }) {

	return (
		<div className="absolute bottom-0 right-0   w-full pt-4  flex justify-end   bg-gradient-to-t from-black/60 to-transparent">
			<LikeButton spotId={props.spotId} className="m-3" />
		</div>
	)
}


export default ImageLinkGrid