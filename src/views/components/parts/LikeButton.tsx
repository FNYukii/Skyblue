import { Unsubscribe } from "firebase/firestore"
import { useState, useEffect } from "react"
import { AiOutlineHeart } from "react-icons/ai"
import Spot from "../../../entities/Spot"
import SpotService from "../../../utils/SpotService"
import LoadingIcon from "./LoadingIcon"
import { AiOutlineExclamationCircle } from "react-icons/ai"



interface Props {
	spotId: string
}



function LikeButton(props: Props) {

	const [spot, setSpot] = useState<Spot | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await SpotService.onSpotChanged(props.spotId, spot => {

				setSpot(spot)
				setIsLoaded(true)

			}, (error) => {

				setIsLoaded(true)
			})
		})()

		return () => {
			if (unsubscribe) unsubscribe()
		}
		// eslint-disable-next-line
	}, [])



	return (

		<div>
			{!isLoaded &&
				<LoadingIcon />
			}

			{isLoaded && spot === null &&
				<AiOutlineExclamationCircle className="text-gray-400 text-xl" />
			}

			{isLoaded && spot !== null &&

				<button className="my-[-0.25rem] mx-[-0.5rem]   py-1 px-2 rounded-full   flex items-center gap-1   hover:bg-white/20 transition">
					<AiOutlineHeart className="text-white text-xl" />
					<p className="text-white">{spot.likedUserIds.length}</p>
				</button>
			}
		</div>
	)
}

export default LikeButton