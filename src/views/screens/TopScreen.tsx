import GMap from "../components/parts/GMap"
import Screen from "../components/parts/Screen"

function TopScreen() {

	return (

		<Screen title="Skyline">

			<GMap className="w-full aspect-video"/>
		</Screen>
	)
}

export default TopScreen