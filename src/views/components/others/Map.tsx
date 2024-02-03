import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import "../../styles/leaflet.css"

// 正しいMap表示に必要なファイルをインポート
import L from "leaflet"
import "leaflet/dist/leaflet.css"
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'



interface Props {
	location: number[]

	className?: string
}



function Map(props: Props) {

	return (

		<div className={props.className}>

			<MapContainer
				center={[props.location[0]!, props.location[1]!]}
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

				<Marker position={[props.location[0]!, props.location[1]!]} />
			</MapContainer>
		</div>
	)
}

export default Map