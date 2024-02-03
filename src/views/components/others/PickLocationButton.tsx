import { TbMapPinPlus } from "react-icons/tb"
import Map from "../others/Map"
import { useState } from "react"
import PickableMap from "./PickableMap"



interface Props {
	location: number[] | null
	onPick: (Location: number[]) => void

	className?: string
}


function PickLocationButton(props: Props) {

	const [isOpenModal, setIsOpenModal] = useState(false)



	return (

		<>

			<div className={props.className}>

				<div className="flex">

					<button onClick={() => setIsOpenModal(true)} className="w-full rounded-xl">

						{props.location === null &&
							<div className="w-full aspect-video   rounded-xl border border-gray-300   flex justify-center items-center   hover:bg-gray-100 transition">
								<TbMapPinPlus className="text-4xl text-gray-400" />
							</div>
						}

						{props.location !== null &&
							<Map location={props.location} className="hover:brightness-90 transition" />
						}
					</button>
				</div>
			</div>



			{isOpenModal &&

				<div className="fixed   top-0 left-0 w-screen h-screen   flex justify-center items-center">

					<div onClick={() => setIsOpenModal(false)} className="w-screen h-screen bg-black/30"></div>

					<div className="absolute">

						<div className="overflow-hidden rounded-xl">

							<div className="max-w-[95vw] sm:w-[900px]   max-h-[95vh]">

								<PickableMap location={props.location} onPick={location => props.onPick(location)} className="mt-4" />
							</div>
						</div>
					</div>
				</div>
			}
		</>
	)
}

export default PickLocationButton