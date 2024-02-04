import { useEffect, useState } from "react"
import Spot from "../../../entities/Spot"
import SpotService from "../../../utils/SpotService"
import { Unsubscribe } from "firebase/firestore"
import SpotList from "../parts/SpotList"



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
		<SpotList spots={spots} isLoaded={isLoaded} className="mt-4"/>
	)
}

export default UserSpotList