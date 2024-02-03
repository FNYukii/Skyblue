import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import Spot from "../../entities/Spot"
import SpotService from "../../utils/SpotService"
import LoadingIcon from "../components/others/LoadingIcon"
import ImageGrid from "../components/sections/ImageGrid"
import URLSpotModal from "../components/others/URLSpotModal"
import UserIcon from "../components/others/UserIcon"

function SpotScreen() {

	document.title = "スポット - Skyline"

	const { spotId } = useParams()



	const [spot, setSpot] = useState<Spot | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		(async () => {

			const spot = await SpotService.readSpot(spotId ?? "")
			setSpot(spot)
			setIsLoaded(true)
		})()

		// eslint-disable-next-line
	}, [])



	return (

		<URLSpotModal>

			<div className="h-full">

				{!isLoaded &&
					<div className="h-[40%] flex flex-col justify-end">
						<LoadingIcon center color="#fff" />
					</div>
				}

				{isLoaded && spot === null &&
					<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
				}

				{isLoaded && spot !== null &&

					<div className="h-full">

						<ImageGrid imagesUrls={spot.imageUrls} className="h-auto sm:h-[90%] max-h-full max-w-full   aspect-square" />

						<div className="mt-2">

							<div className="flex justify-between items-center">

								<p className="text-white">{spot.name}</p>

								<NavLink to={`/users/${spot.userId}`} className="rounded-full   hover:brightness-90 transition">
									<UserIcon userId={spot.userId} className="w-8 rounded-full" />
								</NavLink>
							</div>

							{spot.detail &&
								<p className="text-gray-400">{spot.detail}</p>
							}

						</div>
					</div>
				}
			</div>
		</URLSpotModal>
	)
}

export default SpotScreen