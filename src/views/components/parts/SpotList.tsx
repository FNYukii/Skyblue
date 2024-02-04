import Spot from "../../../entities/Spot"
import ImageGrid from "../sections/ImageGrid"
import NavLinkToModal from "./NavLinkToModal"



interface Props {
	spots: Spot[] | null
	isLoaded: boolean

	className?: string
}



function SpotList(props: Props) {

	return (

		<div className={props.className}>

			{!props.isLoaded &&

				<div className="grid grid-cols-3 gap-2">

					{Array(12).fill(0).map((_item, index) => (

						<div>
							{index % 2 === 0 &&
								<div key={index} className="w-full aspect-square grid grid-cols-2 gap-2">
									<div className="w-full h-full bg-gray-200"></div>
									<div className="w-full h-full bg-gray-200"></div>
									<div className="w-full h-full bg-gray-200"></div>
									<div className="w-full h-full bg-gray-200"></div>
								</div>
							}

							{index % 2 !== 0 &&
								<div className="w-full aspect-square bg-gray-200"></div>
							}
						</div>
					))}
				</div>
			}



			{props.isLoaded && props.spots === null &&
				<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
			}

			{props.isLoaded && props.spots !== null && props.spots.length === 0 &&
				<p className="mt-16   text-center text-gray-500">スポットはありません</p>
			}



			{props.isLoaded && props.spots !== null && props.spots.length !== 0 &&

				<div className="grid grid-cols-3 gap-2">

					{props.spots.map((spot, index) => (

						<NavLinkToModal key={index} to={`/spots/${spot.id}`} className="hover:brightness-90 transition">

							<ImageGrid imagesUrls={spot.imageUrls} />
						</NavLinkToModal>
					))}
				</div>
			}
		</div>
	)
}

export default SpotList