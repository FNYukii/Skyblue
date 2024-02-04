import { useNavigate } from "react-router-dom"
import { MdOutlineClose } from "react-icons/md"
import Escaper from "./Escaper"
import { useEffect } from "react"

interface Props {
	children: JSX.Element | JSX.Element[]
}

function URLModal(props: Props) {

	// 画面遷移用Hooks
	const navigate = useNavigate()



	// 画面スクロール無効
	useEffect(() => {
		document.body.style.overflowY = "hidden"
		
		return () => {
			document.body.style.overflowY = ""
		}
		// eslint-disable-next-line
	}, [])



	return (

		<div className="fixed   top-0 left-0 w-screen h-screen   flex justify-center items-center">

			<Escaper />


			{/* モーダルの影 */}
			<div onClick={() => navigate(-1)} className="w-screen h-screen bg-black/30"></div>


			{/* モーダル */}
			<div className="absolute">

				<div className="overflow-hidden rounded-xl">

					<div className="w-[95vw] max-w-[700px]   sm:w-[700px] sm:max-w-[95vw]   max-h-[95vh]   overflow-y-scroll scrollbar-styled   py-8 pl-8 pr-6 bg-white">

						<button onClick={() => navigate(-1)} className="mt-[-1rem] ml-[-1rem]   p-4 rounded-full   hover:bg-zinc-100 transition">
							<MdOutlineClose className="text-2xl text-zinc-500" />
						</button>

						<div className="mt-2">
							{props.children}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default URLModal