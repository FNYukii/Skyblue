import { MapContainer, Marker, TileLayer, useMap, useMapEvents } from 'react-leaflet'

// 正しいMap表示に必要なファイルをインポート
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { useState } from 'react'
L.Icon.Default.imagePath = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/'



interface Props {
	onPick: (location: number[]) => void
	defaultLocation?: number[]

	className?: string
}



function PickableMap(props: Props) {

	const defaultCenter = [35.1706763855153, 136.88172646669815]
	
	const [location, setLocation] = useState<number[] | null>(props.defaultLocation ?? null)
	


	return (

		<div className={props.className}>

			<MapContainer
				center={[defaultCenter[0]!, defaultCenter[1]!]}
				zoom={7}
				className='w-full h-full   outline-none rounded-xl'
			>

				{location &&
					<MapChanger center={location} />
				}


				<TileLayer
					attribution="GoogleMaps"
					url="https://mt1.google.com/vt/lyrs=r&x={x}&y={y}&z={z}"
				/>

				<MapEventListener onPick={location => setLocation(location)} />

				{location !== null &&
					<Marker position={[location[0]!, location[1]!]} />
				}
			</MapContainer>

			{location !== null &&
				<button onClick={() => props.onPick(location)} className="absolute top-0 right-0 mt-4 mr-4   px-8 py-1 bg-black text-white font-bold rounded-full   hover:bg-gray-600 transition">完了</button>
			}
		</div>
	)
}



function MapChanger(props: { center: number[] }) {
	const map = useMap()
	map.setView([props.center[0]!, props.center[1]!])
	return null
}



function MapEventListener(props: { onPick: (location: number[]) => void }) {

	useMapEvents({

		async click(e) {

			const lat = e.latlng.lat
			const lng = e.latlng.lng
			const clickedLocation = [lat, lng]

			props.onPick(clickedLocation)
		}
	})

	return null
}



export default PickableMap