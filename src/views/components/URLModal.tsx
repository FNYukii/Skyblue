import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

interface Props {
	children: JSX.Element | JSX.Element[]
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
			<div className="absolute    w-full px-6    sm:w-fit">

				<div className="p-8 bg-white rounded-xl">
					{props.children}
				</div>
			</div>
		</div>
	)
}

export default URLModal