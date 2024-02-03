import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'

// 正しいMap表示に必要なファイルをインポート
import "leaflet/dist/leaflet.css"
import L from "leaflet"
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'



interface Props {
	location: number[] | null
	onPick: (location: number[]) => void

	className?: string
}



function PickableMap(props: Props) {

	const defaultCenter = [34.686834235230265, 135.52812788280627]



	return (

		<div className={props.className}>

			<MapContainer
				center={[defaultCenter[0]!, defaultCenter[1]!]}
				zoom={14}

				doubleClickZoom={false}
				
				className='w-full h-full   border rounded-xl'
			>

				{props.location &&
					<MapChanger center={props.location} />
				}


				<TileLayer
					attribution="GoogleMaps"
					url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
				/>

				<MapEvents onPick={location => props.onPick(location)} />

				{props.location !== null &&
					<Marker position={[props.location[0]!, props.location[1]!]} />
				}
			</MapContainer>
		</div>
	)
}



function MapChanger(props: { center: number[] }) {
	const map = useMap()
	map.setView([props.center[0]!, props.center[1]!])
	return null
}



function MapEvents(props: { onPick: (location: number[]) => void }) {

	// マップをダブルクリックしたら、配列locationにその座標を格納
	useMapEvents({

		async dblclick(e) {
			const lat = e.latlng.lat
			const lng = e.latlng.lng
			props.onPick([lat, lng])
		}
	})

	return null
}



export default PickableMap