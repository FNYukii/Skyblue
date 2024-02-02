import { useEffect, useState } from "react"
import Spot from "../../entities/Spot"
import SpotService from "../../utils/SpotService"
import LoadingIcon from "./LoadingIcon"

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

				<p>Error.</p>
			}

			{isLoaded && spots !== null &&

				<div className="grid grid-cols-4 gap-2">

					{spots.map((spot, index) => (

						<button key={index} className="hover:brightness-90 transition   rounded-lg overflow-hidden">

							<img src={spot.images[0]} alt={spot.title} className="aspect-square object-cover   bg-gray-100" />
						</button>
					))}
				</div>
			}
		</div>
	)
}

export default SpotList