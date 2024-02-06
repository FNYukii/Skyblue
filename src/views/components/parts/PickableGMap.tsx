import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api"
import { useState } from "react"


interface Props {
	onPick: (location: number[]) => void
	defaultLocation?: number[]

	className?: string
}



function PickableGMap(props: Props) {

	const defaultCenter = [35.1706763855153, 136.88172646669815]

	const [location, setLocation] = useState<number[] | null>(props.defaultLocation ?? null)

	return (

		<div className={props.className}>

			<div className="w-full h-full bg-gray-300">

				<LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_PLATFORM_API_KEY}`}>

					<GoogleMap
						options={{
							fullscreenControl: false,
							mapTypeControl: false,
							streetViewControl: false,
							zoomControl: false,
							gestureHandling: "greedy"
						}}
						center={{ lat: defaultCenter[0], lng: defaultCenter[1] }}
						zoom={7}

						onClick={e => {

							if (!e.latLng) return

							const lat = e.latLng.lat()
							const lng = e.latLng.lng()
							setLocation([lat, lng])
						}}

						mapContainerClassName="w-full h-full   min-w-40 min-h-40"
					>

						{location !== null &&
							<MarkerF position={{ lat: location[0], lng: location[1] }} />
						}
					</GoogleMap>
				</LoadScript>
			</div>



			{location !== null &&
				<button onClick={() => props.onPick(location)} className="absolute top-0 right-0 mt-4 mr-4   px-8 py-1 bg-black text-white font-bold rounded-full   hover:bg-gray-600 transition">完了</button>
			}
		</div>
	)
}




export default PickableGMap