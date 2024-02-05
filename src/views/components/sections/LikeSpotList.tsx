import { useState } from "react"
import Spot from "../../../entities/Spot"
import SpotList from "../parts/SpotList"



interface Props {
	userId: string
	className?: string
}



function LikeSpotList(props: Props) {

	const [spots, setSpots] = useState<Spot[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	



	return (
		<SpotList spots={spots} isLoaded={isLoaded} className="mt-4" />
	)
}

export default LikeSpotList