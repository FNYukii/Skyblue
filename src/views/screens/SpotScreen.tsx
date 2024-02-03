import { useEffect, useState } from "react"
import { NavLink, useParams } from "react-router-dom"
import Spot from "../../entities/Spot"
import SpotService from "../../utils/SpotService"
import LoadingIcon from "../components/others/LoadingIcon"
import ImageGrid from "../components/sections/ImageGrid"
import Map from "../components/others/Map"
import dayjs from "dayjs"
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

		<div>
			{!isLoaded &&
				<LoadingIcon center className="mt-16" />
			}

			{isLoaded && spot === null &&
				<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
			}

			{isLoaded && spot !== null &&

				<div>
					<div className="mt-4   grid grid-cols-2 gap-x-8">

						<ImageGrid imagesUrls={spot.imageUrls} />

						<div>
							<Map location={spot.location} className="w-full aspect-video" />

							<h1 className="mt-2 text-2xl font-bold">{spot.title}</h1>

							{spot.comment !== "" &&
								<p className="mt-1">{spot.comment}</p>
							}

							<p className="mt-1 text-gray-500">{dayjs(spot.createdAt).format("YYYY/MM/DD")}</p>

							<NavLink to={`/users/${spot.userId}`} className="inline-block hover:brightness-90 transition">
								<UserIcon userId={spot.userId} className="w-8" />
							</NavLink>
						</div>
					</div>
				</div>
			}
		</div>
	)
}

export default SpotScreen