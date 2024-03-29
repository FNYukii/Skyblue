import { useLocation, useNavigate } from "react-router-dom"
import { MdOutlineClose } from "react-icons/md"
import Escaper from "./Escaper"
import { ReactNode, useRef } from "react"
import Fixer from "./Fixer"
import FocusTrapper from "./FocusTrapper"

interface Props {
	children?: ReactNode
	className?: string
}

function FormModal(props: Props) {

	// 画面遷移用Hooks
	const navigate = useNavigate()
	const location = useLocation()

	// このモーダルのRef
	const ref = useRef(null)



	return (

		<div ref={ref} className="fixed   top-0 left-0 w-screen h-screen   flex justify-center items-center">

			<Escaper />
			<Fixer />
			<FocusTrapper target={ref}/>


			{/* モーダルの影 */}
			<div
				onClick={() => {
					if (location.key === "default") navigate("/")
					if (location.key !== "default") navigate(-1)
				}}
				className="w-screen h-screen bg-black/30"
			/>


			{/* モーダル */}
			<div className="absolute">

				<div className="overflow-hidden rounded-xl">

					<div className="w-[95vw] sm:w-fit   max-h-[95vh]   overflow-y-scroll scrollbar-styled   py-8 pl-8 pr-6 bg-white">

						<button
							onClick={() => {
								if (location.key === "default") navigate("/")
								if (location.key !== "default") navigate(-1)
							}}
							className="m-[-1rem] p-4   rounded-full   hover:bg-zinc-100 transition"
						>
							<MdOutlineClose className="text-2xl text-zinc-500" />
						</button>

						<div className="mt-4">
							<div className={props.className}>
								{props.children}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default FormModal