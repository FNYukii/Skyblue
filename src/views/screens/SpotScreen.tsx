import { useEffect, useState } from "react"
import { NavLink, useNavigate, useParams } from "react-router-dom"
import Spot from "../../entities/Spot"
import SpotService from "../../utils/SpotService"
import LoadingIcon from "../components/parts/LoadingIcon"
import UserIcon from "../components/parts/UserIcon"
import { MdOutlineClose } from "react-icons/md"
import Escaper from "../components/parts/Escaper"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { AiOutlineArrowRight } from "react-icons/ai"



function SpotScreen() {

	document.title = "スポット - Skyline"

	const { spotId } = useParams()
	const { imageNumber } = useParams()



	// 画面遷移用Hooks
	const navigate = useNavigate()



	// 画像のインデックス
	const [imageIndex, setImageIndex] = useState(Number(imageNumber!) - 1)




	// Spot
	const [spot, setSpot] = useState<Spot | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	// Spotを読み取る
	useEffect(() => {

		(async () => {

			const spot = await SpotService.readSpot(spotId ?? "")
			setSpot(spot)
			setIsLoaded(true)
		})()

		// eslint-disable-next-line
	}, [])



	// 表示する画像を切り替える
	function switchImage(newImageIndex: number) {

		setImageIndex(newImageIndex)

		// アドレスバーのURLを置き換え
		navigate(`/spots/${spotId}/images/${newImageIndex + 1}`, { replace: true })
	}



	return (

		<div className="fixed   top-0 left-0 w-screen h-screen   flex justify-center items-center">

			<Escaper />
			<div onClick={() => navigate(-1)} className="w-screen h-screen bg-black/90"></div>



			<div className="absolute   h-[95vh] max-w-[95vw] max-h-[95vh]   pointer-events-none">

				{!isLoaded &&
					<LoadingIcon center large color="#fff" className="mt-[30vh]" />
				}

				{isLoaded && spot === null &&
					<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
				}

				{isLoaded && spot !== null &&

					<div className="h-full">

						<div className="h-[90%]   flex items-center gap-x-2">

							<button onClick={() => switchImage(imageIndex - 1)} disabled={imageIndex === 0} className="h-fit w-fit   p-3 rounded-full   text-white   disabled:opacity-0 enabled:pointer-events-auto   enabled:hover:bg-white/20 transition">
								<AiOutlineArrowLeft className="text-2xl" />
							</button>

							<img src={spot.imageUrls[imageIndex]} alt="Attached on Spot" className="h-full   pointer-events-auto" />

							<button onClick={() => switchImage(imageIndex + 1)} disabled={imageIndex === spot.imageUrls.length - 1} className="h-fit w-fit   p-3 rounded-full   text-white   disabled:opacity-0 enabled:pointer-events-auto   enabled:hover:bg-white/20 transition">
								<AiOutlineArrowRight className="text-2xl" />
							</button>
						</div>

						<div className="mt-2 mx-auto  w-[600px]   pointer-events-auto">

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



			<button onClick={() => navigate(-1)} className="absolute top-0 left-0   m-2   p-4 rounded-full    hover:bg-white/20 transition">
				<MdOutlineClose className="text-2xl text-white" />
			</button>
		</div>
	)
}

export default SpotScreen