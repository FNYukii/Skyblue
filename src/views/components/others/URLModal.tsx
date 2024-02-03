import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface Props {
	children: JSX.Element | JSX.Element[]
	widthOnDesktop: number
}

function URLModal(props: Props) {

	// 画面遷移用Hooks
	const navigate = useNavigate()



	useEffect(() => {

		// キーイベント設定
		document.addEventListener("keydown", onKeyDown, false)

		// 画面スクロール無効
		document.body.style.overflowY = "hidden"

		return () => {
			document.removeEventListener("keydown", onKeyDown, false)
			document.body.style.overflowY = ""
		}

		// eslint-disable-next-line
	}, [])



	// Escキーでモーダルを閉じる関数
	function onKeyDown(event: KeyboardEvent) {
		if (event.key === "Escape") navigate(-1)
	}



	return (

		<div className="fixed   top-0 left-0 w-screen h-screen   flex justify-center items-center">


			{/* モーダルの影 */}
			<div onClick={() => navigate(-1)} className="w-screen h-screen bg-black/30"></div>


			{/* モーダル */}
			<div className="absolute">

				<div className="overflow-hidden rounded-xl">
					
					<div className={`w-[90vw] max-w-[${props.widthOnDesktop}px]   sm:w-[${props.widthOnDesktop}px]   max-h-[95vh]   overflow-y-scroll scrollbar-styled   py-8 pl-8 pr-6 bg-white`}>

						{props.children}
					</div>
				</div>
			</div>
		</div>
	)
}

export default URLModal