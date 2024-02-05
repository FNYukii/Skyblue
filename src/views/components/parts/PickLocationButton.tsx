import { TbMapPinPlus } from "react-icons/tb"
import Map from "./Map"
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
							<Map location={props.location} className="w-full aspect-video   hover:brightness-90 transition" />
						}
					</button>
				</div>
			</div>



			{isOpenModal &&

				<div className="fixed   top-0 left-0 w-screen h-screen   flex justify-center items-center">

					<div onClick={() => setIsOpenModal(false)} className="w-screen h-screen bg-black/30"></div>

					<div className="absolute">

						<PickableMap
							onPick={location => {

								props.onPick(location)
								setIsOpenModal(false)
							}}
							defaultLocation={props.location ?? undefined}
							className="w-[90vw] h-[90vh]"
						/>
					</div>
				</div>
			}
		</>
	)
}

export default PickLocationButton