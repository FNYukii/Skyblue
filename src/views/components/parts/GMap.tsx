import { GoogleMap, LoadScript } from "@react-google-maps/api"


interface Props {
	className?: string
}



function GMap(props: Props) {

	return (

		<div className={props.className}>

			<LoadScript googleMapsApiKey={`${process.env.REACT_APP_GOOGLE_MAPS_PLATFORM_API_KEY}`}>

				<GoogleMap
					center={{ lat: 34.70381868213214, lng: 135.49635528380549 }}
					zoom={7}
					mapContainerClassName="w-full h-full   min-w-40 min-h-40"
				/>
			</LoadScript>
		</div>
	)
}




export default GMap