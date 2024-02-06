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
import LikeButton from "../components/parts/LikeButton"
import Screen from "../components/parts/Screen"



function SpotScreen() {

	// 画面スクロール無効
	useEffect(() => {
		document.body.style.overflowY = "hidden"

		return () => {
			document.body.style.overflowY = ""
		}
		// eslint-disable-next-line
	}, [])



	// Params
	const { spotId } = useParams()
	const { imageNumber } = useParams()

	// 画面のタイトル
	const [pageTitle, setPageTitle] = useState<string | null>(null)

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

			const spot = await SpotService.readSpot(spotId ?? "---", true)

			setPageTitle(`${spot?.name ?? "スポット"} - Skyblue`)
			setSpot(spot)
			setIsLoaded(true)
		})()

		// eslint-disable-next-line
	}, [])



	// 表示する画像を切り替える
	function prevImage() {

		if (!isLoaded || spot === null) return
		if (imageIndex === 0) return

		const newImageIndex = imageIndex - 1

		setImageIndex(newImageIndex)
		navigate(`/spots/${spotId}/images/${newImageIndex + 1}`, { replace: true })
	}

	function nextImage() {

		if (!isLoaded || spot === null) return
		if (imageIndex === spot.imageUrls.length - 1) return

		const newImageIndex = imageIndex + 1

		setImageIndex(newImageIndex)
		navigate(`/spots/${spotId}/images/${newImageIndex + 1}`, { replace: true })
	}




	// TODO: たまにしか動かないので直す
	// 矢印キーが押されたら画像を切り替える
	function onKeyDown(event: KeyboardEvent) {
		if (event.keyCode === 37) {
			prevImage()
		}

		if (event.keyCode === 39) {
			nextImage()
		}
	}

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown, false)

		return () => {
			document.removeEventListener("keydown", onKeyDown, false)
		}
		// eslint-disable-next-line
	}, [])



	return (

		<Screen title={pageTitle ?? "スポット - Skyline"}>

			<div className="fixed   top-0 left-0 w-screen h-screen   flex justify-center items-center">

				<Escaper />
				<div onClick={() => navigate(-1)} className="w-screen h-screen bg-black/90"></div>



				<div className="absolute   h-[95vh] max-w-[95vw] max-h-[95vh]   pointer-events-none">

					{!isLoaded &&
						<LoadingIcon center large color="#fff" className="mt-[40vh]" />
					}

					{isLoaded && spot === null &&
						<p className="mt-[40vh]   text-center text-gray-400">読み取りに失敗しました</p>
					}

					{isLoaded && spot !== null &&

						<div className="h-full   flex flex-col gap-2">



							<div className="min-h-0 grow    w-fit mx-auto">

								<div className="h-full    max-w-screen   flex items-center gap-2">

									<button onClick={() => prevImage()} disabled={imageIndex === 0} className="h-fit w-fit   p-3 rounded-full   text-white   disabled:opacity-0 enabled:pointer-events-auto   enabled:hover:bg-white/20 transition">
										<AiOutlineArrowLeft className="text-2xl" />
									</button>

									<img src={spot.imageUrls[imageIndex]} alt="Attached on Spot" className="h-full   pointer-events-auto   min-w-0" />

									<button onClick={() => nextImage()} disabled={imageIndex === spot.imageUrls.length - 1} className="h-fit w-fit   p-3 rounded-full   text-white   disabled:opacity-0 enabled:pointer-events-auto   enabled:hover:bg-white/20 transition">
										<AiOutlineArrowRight className="text-2xl" />
									</button>
								</div>
							</div>



							<div className="mx-auto min-w-full sm:min-w-[600px]   px-3">

								<div className="pointer-events-auto">

									<div className="flex justify-between items-center gap-4">

										<p className="text-white">{spot.name}</p>

										<div className="flex items-center gap-4">

											<LikeButton spotId={spot.id} showLikeCount />

											<NavLink to={`/users/${spot.userId}`} className="rounded-full   hover:brightness-90 transition">
												<UserIcon userId={spot.userId} className="w-8 rounded-full" />
											</NavLink>
										</div>
									</div>

									{spot.detail &&
										<p className="text-gray-400">{spot.detail}</p>
									}
								</div>
							</div>
						</div>
					}
				</div>



				<button onClick={() => navigate(-1)} className="absolute top-0 left-0   m-2   p-4 rounded-full    hover:bg-white/20 transition">
					<MdOutlineClose className="text-2xl text-white" />
				</button>
			</div>
		</Screen>
	)
}

export default SpotScreen