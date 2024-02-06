import { GoogleMap, MarkerF } from "@react-google-maps/api"


interface Props {
	location: number[]
	className?: string
}



function GMap(props: Props) {

	return (

		<div className={props.className}>

			<GoogleMap
				options={{
					disableDefaultUI: true,
					draggable: false
				}}
				center={{ lat: props.location[0], lng: props.location[1] }}
				zoom={14}
				mapContainerClassName="w-full h-full   min-w-40 min-h-40"
			>

				<MarkerF position={{ lat: props.location[0], lng: props.location[1] }} />
			</GoogleMap>
		</div>
	)
}




export default GMap