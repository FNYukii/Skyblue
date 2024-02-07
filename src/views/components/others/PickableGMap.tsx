import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"
import { useState } from "react"


interface Props {
	onPick: (location: { lat: number, lng: number }) => void
	defaultLocation?: { lat: number, lng: number }

	className?: string
}



function PickableGMap(props: Props) {

	// Mapのスクリプトをロード
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_PLATFORM_API_KEY}`,
		language: "ja"
	})



	const defaultCenter = { lat: 35.1706763855153, lng: 136.88172646669815 }

	const [location, setLocation] = useState<{ lat: number, lng: number } | null>(props.defaultLocation ?? null)

	const [isClicked, setIsClicked] = useState(false)



	return (

		<div className={props.className}>

			<div className="w-full h-full bg-gray-300">

				{isLoaded &&

					<GoogleMap
						options={{
							fullscreenControl: false,
							mapTypeControl: false,
							streetViewControl: false,
							zoomControl: false,
							gestureHandling: "greedy"
						}}
						center={!isClicked ? (props.defaultLocation ?? defaultCenter) : undefined}
						zoom={7}

						onClick={e => {

							setIsClicked(true)

							if (!e.latLng) return
							const lat = e.latLng.lat()
							const lng = e.latLng.lng()
							setLocation({ lat: lat, lng: lng })
						}}

						mapContainerClassName="w-full h-full   min-w-40 min-h-40"
					>

						{location !== null &&
							<MarkerF position={location} />
						}
					</GoogleMap>
				}
			</div>



			{location !== null &&
				<button onClick={() => props.onPick(location)} className="absolute top-0 right-0 mt-4 mr-4   px-8 py-1 bg-black text-white font-bold rounded-full   hover:bg-gray-600 transition">完了</button>
			}
		</div>
	)
}

export default PickableGMap