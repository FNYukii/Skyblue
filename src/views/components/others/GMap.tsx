import { GoogleMap, MarkerF, useJsApiLoader } from "@react-google-maps/api"


interface Props {
	location: {lat: number, lng: number}
	className?: string
}



function GMap(props: Props) {

	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: `${process.env.REACT_APP_GOOGLE_MAPS_PLATFORM_API_KEY}`,
		language: "ja"
	})



	return (

		<div className={props.className}>

			{isLoaded &&
				<GoogleMap
					options={{
						disableDefaultUI: true,
						draggable: false
					}}
					center={props.location}
					zoom={14}
					mapContainerClassName="w-full h-full   min-w-40 min-h-40"
				>

					<MarkerF position={props.location} />
				</GoogleMap>
			}
		</div>
	)
}

export default GMap