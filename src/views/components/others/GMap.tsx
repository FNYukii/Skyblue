import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"


interface Props {
	locations: { lat: number, lng: number }[]
	className?: string
}



function GMap(props: Props) {

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_PLATFORM_API_KEY}`,
		language: "ja"
	})

	const defaultCenter = { lat: 35.1706763855153, lng: 136.88172646669815 }



	return (

		<div className={props.className}>

			{isLoaded &&
				<GoogleMap
					options={{
						disableDefaultUI: true,
						draggable: false,
						clickableIcons: false
					}}
					center={props.locations[0] ?? defaultCenter}
					zoom={14}
					mapContainerClassName="w-full h-full   min-w-40 min-h-40"
				>

					{props.locations.map((location, index) => (
						
						<MarkerF key={index} position={location} options={{ clickable: false }} />
					))}
				</GoogleMap>
			}
		</div>
	)
}

export default GMap