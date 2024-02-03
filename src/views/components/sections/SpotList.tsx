import { useEffect, useState } from "react"
import Spot from "../../../entities/Spot"
import SpotService from "../../../utils/SpotService"
import ImageGrid from "./ImageGrid"
import NavLinkToModal from "../others/NavLinkToModal"
import LoadingSpotGrid from "../others/LoadingSpotGrid"



function SpotList() {

	const [spots, setSpots] = useState<Spot[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		(async () => {

			const spots = await SpotService.readSpots()

			setSpots(spots)
			setIsLoaded(true)
		})()
	}, [])



	return (

		<div>

			{!isLoaded &&
				<LoadingSpotGrid />
			}

			{isLoaded && spots === null &&
				<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
			}

			{isLoaded && spots !== null && spots.length === 0 &&
				<p className="mt-16   text-center text-gray-500">スポットはありません</p>
			}

			{isLoaded && spots !== null && spots.length !== 0 &&

				<div className="grid grid-cols-3 gap-2">

					{spots.map((spot, index) => (

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