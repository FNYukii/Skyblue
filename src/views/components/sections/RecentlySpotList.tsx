import { useEffect, useState } from "react"
import Spot from "../../../entities/Spot"
import SpotService from "../../../utils/SpotService"
import SpotList from "../parts/SpotList"



function RecentlySpotList() {

	const [spots, setSpots] = useState<Spot[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		(async () => {

			const spots = await SpotService.readRecentlySpots()

			setSpots(spots)
			setIsLoaded(true)
		})()
	}, [])



	return (
		<SpotList spots={spots} isLoaded={isLoaded}/>
	)
}

export default RecentlySpotList