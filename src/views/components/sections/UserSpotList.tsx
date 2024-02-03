import { useEffect, useState } from "react"
import Spot from "../../../entities/Spot"
import SpotService from "../../../utils/SpotService"
import LoadingIcon from "../others/LoadingIcon"
import ImageGrid from "./ImageGrid"
import { NavLink } from "react-router-dom"
import { Unsubscribe } from "firebase/firestore"



interface Props {
	userId: string
	className?: string
}



function UserSpotList(props: Props) {

	const [spots, setSpots] = useState<Spot[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await SpotService.onSpotsByUserChanged(props.userId, spots => {

				setSpots(spots)
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

		<div className={props.className}>

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

							<ImageGrid imagesUrls={spot.imageUrls} />
						</NavLink>
					))}
				</div>
			}
		</div>
	)
}

export default UserSpotList