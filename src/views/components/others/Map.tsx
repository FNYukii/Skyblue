import { MapContainer, Marker, TileLayer } from 'react-leaflet'

// 正しいMap表示に必要なファイルをインポート
import L, { LatLngTuple } from "leaflet"
import "leaflet/dist/leaflet.css"
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'



interface Props {
	location: number[]

	className?: string
}



function Map(props: Props) {

	const location: LatLngTuple = [props.location[0]!, props.location[1]!]

	return (

		<div className={props.className}>

			<MapContainer
				center={location}

				zoom={14}
				scrollWheelZoom={false}
				doubleClickZoom={false}
				dragging={false}
				zoomControl={false}

				className='aspect-video border rounded-xl'
			>

				<TileLayer
					attribution="GoogleMaps"
					url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
				/>

				<Marker position={location} />
			</MapContainer>
		</div>
	)
}

export default Map