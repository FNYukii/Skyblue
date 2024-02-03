import { TbMapPinPlus } from "react-icons/tb"
import Map from "../others/Map"



interface Props {
	location: number[] | null
	// onPick: (Location: number[]) => void
}


function PickLocationButton(props: Props) {

	return (

		<button className="mt-4   w-full rounded-xl">
			{props.location === null &&
				<div className="w-full aspect-video   rounded-xl border border-gray-300   flex justify-center items-center   hover:bg-gray-100 transition">
					<TbMapPinPlus className="text-4xl text-gray-400" />
				</div>
			}

			{props.location !== null &&
				<Map location={props.location} className="mt-4" />
			}
		</button>
	)
}

export default PickLocationButton