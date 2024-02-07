import Spot from "../../../entities/Spot"
import ImageLinkGrid from "./ImageLinkGrid"



interface Props {
	spots: Spot[] | null
	isLoaded: boolean

	className?: string
}



function SpotList(props: Props) {

	return (

		<div className={props.className}>

			{!props.isLoaded &&

				<div>

					<div className="grid md:hidden   grid-cols-2 gap-2">

						<GrayBox fourBoxes />
						<GrayBox />

						<GrayBox />
						<GrayBox fourBoxes />

						<GrayBox fourBoxes />
						<GrayBox />

						<GrayBox />
						<GrayBox fourBoxes />
					</div>

					<div className="hidden md:grid lg:hidden   grid-cols-3 gap-2">

						{Array(12).fill(0).map((_item, index) => (

							<div key={index}>
								{index % 2 === 0 &&
									<GrayBox fourBoxes />
								}

								{index % 2 !== 0 &&
									<GrayBox />
								}
							</div>
						))}
					</div>

					<div className="hidden lg:grid   grid-cols-4 gap-2">

						<GrayBox fourBoxes />
						<GrayBox />
						<GrayBox fourBoxes />
						<GrayBox />

						<GrayBox />
						<GrayBox fourBoxes />
						<GrayBox />
						<GrayBox fourBoxes />

						<GrayBox fourBoxes />
						<GrayBox />
						<GrayBox fourBoxes />
						<GrayBox />
					</div>
				</div>
			}



			{props.isLoaded && props.spots === null &&
				<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
			}

			{props.isLoaded && props.spots !== null && props.spots.length === 0 &&
				<p className="mt-16   text-center text-gray-500">投稿はありません</p>
			}



			{props.isLoaded && props.spots !== null && props.spots.length !== 0 &&

				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4   gap-2">

					{props.spots.map((spot, index) => (
						<ImageLinkGrid key={index} imageUrls={spot.imageUrls} spotId={spot.id} />
					))}
				</div>
			}
		</div>
	)
}

export default SpotList



function GrayBox(props: { fourBoxes?: boolean }) {

	return (

		<div className="w-full aspect-square">

			{!props.fourBoxes &&
				<div className="w-full h-full   bg-gray-200" />
			}

			{props.fourBoxes &&
				<div className="w-full h-full   grid grid-cols-2 gap-2">
					<div className="w-full h-full   bg-gray-200" />
					<div className="w-full h-full   bg-gray-200" />
					<div className="w-full h-full   bg-gray-200" />
					<div className="w-full h-full   bg-gray-200" />
				</div>
			}
		</div>
	)
}