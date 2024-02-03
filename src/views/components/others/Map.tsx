import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet'
import "../../styles/leaflet.css"

// 正しいMap表示に必要なファイルをインポート
import "leaflet/dist/leaflet.css"
import L from "leaflet"
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

				<MapChanger center={props.location}/>

				<TileLayer
					attribution="GoogleMaps"
					url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
				/>

				<Marker position={[props.location[0]!, props.location[1]!]} />
			</MapContainer>
		</div>
	)
}



function MapChanger(props: { center:number[] }) {
  const map = useMap()
  map.setView([props.center[0]!, props.center[1]!])
  return null
}



export default Map