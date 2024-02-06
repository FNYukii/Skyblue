import GMap from "../components/parts/GMap"
import Screen from "../components/parts/Screen"

function TopScreen() {

	return (

		<Screen title="Skyline">

			<GMap location={[34.70381868213214, 135.49635528380549]} className="w-full aspect-video"/>
		</Screen>
	)
}

export default TopScreen