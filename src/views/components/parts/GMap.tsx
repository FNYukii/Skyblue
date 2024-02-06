import { GoogleMap, LoadScript } from "@react-google-maps/api"


interface Props {
	location: number[]
	className?: string
}



function GMap(props: Props) {

	const defaultCenter = [34.70381868213214, 135.49635528380549]

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
				/>
			</LoadScript>
		</div>
	)
}




export default GMap