import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { MdOutlineClose } from "react-icons/md"

interface Props {
	children: JSX.Element | JSX.Element[]
}

function URLSpotModal(props: Props) {

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
			<div onClick={() => navigate(-1)} className="w-screen h-screen bg-black/70"></div>


			{/* モーダル */}
			<div className="absolute   h-[90vh] w-fit max-w-[95vw] max-h-[95vh]">
				{props.children}
			</div>

			<button onClick={() => navigate(-1)} className="absolute top-0 left-0   m-2   p-4 rounded-full    hover:bg-white/10 transition">
				<MdOutlineClose className="text-2xl text-white" />
			</button>
		</div>
	)
}

export default URLSpotModal