import { Unsubscribe } from "firebase/firestore"
import { useState, useEffect } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import Spot from "../../../entities/Spot"
import SpotService from "../../../utils/SpotService"
import LoadingIcon from "./LoadingIcon"
import { AiOutlineExclamationCircle } from "react-icons/ai"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../../utils/firebase"



interface Props {
	spotId: string
}



function LikeButton(props: Props) {

	// 該当のSpot
	const [spot, setSpot] = useState<Spot | null>(null)
	const [isLoadedSpot, setIsLoadedSpot] = useState(false)

	// Spotを監視して最新のSpotを取得
	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await SpotService.onSpotChanged(props.spotId, spot => {

				setSpot(spot)
				setIsLoadedSpot(true)

			}, (error) => {
				setIsLoadedSpot(true)
			})
		})()

		return () => {
			if (unsubscribe) unsubscribe()
		}
		// eslint-disable-next-line
	}, [])




	// ログイン中のUID
	const [uid, setUid] = useState<string | null>(null)
	const [isLoadedUid, setIsLoadedUid] = useState(false)

	// ログイン状態を監視して最新のユーザーIDを取得
	useEffect(() => {

		onAuthStateChanged(auth, (user) => {

			setUid(user?.uid ?? null)
			setIsLoadedUid(true)
		})
	}, [])



	return (

		<div>
			{!isLoadedSpot &&
				<LoadingIcon />
			}

			{isLoadedSpot && spot === null &&
				<AiOutlineExclamationCircle className="text-gray-400 text-xl" />
			}

			{isLoadedSpot && spot !== null &&

				<div>

					{!isLoadedUid &&
						<LoadingIcon />
					}

					{isLoadedUid && uid === null &&
						<div className="my-[-0.25rem] mx-[-0.5rem]   py-1 px-2 rounded-full   flex items-center gap-1">

							<AiOutlineHeart className="text-white text-xl" />
							<p className="text-white">{spot.likedUserIds.length}</p>
						</div>
					}

					{isLoadedUid && uid !== null && !spot.likedUserIds.includes(uid) &&
						<button className="my-[-0.25rem] mx-[-0.5rem]   py-1 px-2 rounded-full   flex items-center gap-1   hover:bg-white/20 transition">

							<AiOutlineHeart className="text-white text-xl" />
							<p className="text-white">{spot.likedUserIds.length}</p>
						</button>
					}

					{isLoadedUid && uid !== null && spot.likedUserIds.includes(uid) &&
						<button className="my-[-0.25rem] mx-[-0.5rem]   py-1 px-2 rounded-full   flex items-center gap-1   hover:bg-white/20 transition">

							<AiFillHeart className="text-white text-xl" />
							<p className="text-white">{spot.likedUserIds.length}</p>
						</button>
					}
				</div>
			}
		</div>
	)
}

export default LikeButton