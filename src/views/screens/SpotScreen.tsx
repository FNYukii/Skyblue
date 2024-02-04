import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import Spot from "../../entities/Spot"
import SpotService from "../../utils/SpotService"
import LoadingIcon from "../components/parts/LoadingIcon"
import ImageGrid from "../components/sections/ImageGrid"
import UserIcon from "../components/parts/UserIcon"
import { MdOutlineClose } from "react-icons/md"
import Escaper from "../components/parts/Escaper"

function SpotScreen() {

	document.title = "スポット - Skyline"

	const { spotId } = useParams()

	// 画面遷移用Hooks
	const navigate = useNavigate()



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

		<div className="fixed   top-0 left-0 w-screen h-screen   flex justify-center items-center">

			<Escaper />
			<div onClick={() => navigate(-1)} className="w-screen h-screen bg-black/70"></div>



			<div className="absolute   h-[90vh] max-w-[95vw] max-h-[95vh]">

				{!isLoaded &&
					<div className="h-[40%] flex flex-col justify-end">
						<LoadingIcon center large color="#fff" />
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



			<button onClick={() => navigate(-1)} className="absolute top-0 left-0   m-2   p-4 rounded-full    hover:bg-white/10 transition">
				<MdOutlineClose className="text-2xl text-white" />
			</button>
		</div>
	)
}

export default SpotScreen