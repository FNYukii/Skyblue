import { GoogleMap, LoadScript, MarkerF } from "@react-google-maps/api"


interface Props {
	location: number[]
	className?: string
}



function GMap(props: Props) {

	return (

		<div className={props.className}>

			<LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_PLATFORM_API_KEY}`}>

				<GoogleMap
					options={{
						// fullscreenControl: false,
						// mapTypeControl: false,
						// streetViewControl: false,
						// zoomControl: false,
						// gestureHandling: "greedy"

						disableDefaultUI: true,
						draggable: false
					}}
					center={{ lat: props.location[0], lng: props.location[1] }}
					zoom={14}
					mapContainerClassName="w-full h-full   min-w-40 min-h-40"
				>

					<MarkerF position={{ lat: props.location[0], lng: props.location[1] }} />
				</GoogleMap>
			</LoadScript>
		</div>
	)
}




export default GMap