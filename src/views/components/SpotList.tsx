import { useEffect, useState } from "react"
import Spot from "../../entities/Spot"
import SpotService from "../../utils/SpotService"
import LoadingIcon from "./others/LoadingIcon"
import ImageGrid from "./ImageGrid"
import { NavLink } from "react-router-dom"

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
				<LoadingIcon center className="mt-16" />
			}

			{isLoaded && spots === null &&
				<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
			}

			{isLoaded && spots !== null && spots.length === 0 &&
				<p className="mt-16   text-center text-gray-500">スポットはありません</p>
			}

			{isLoaded && spots !== null && spots.length !== 0 &&

				<div className="grid grid-cols-4 gap-1">

					{spots.map((spot, index) => (

						<NavLink key={index} to={`/spots/${spot.id}`} className="hover:brightness-90 transition">

							<ImageGrid imagesUrls={spot.imageUrls}/>
						</NavLink>
					))}
				</div>
			}
		</div>
	)
}

export default SpotList