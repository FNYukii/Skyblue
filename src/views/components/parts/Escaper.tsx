import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function Escaper() {

	// 画面遷移用Hooks
	const navigate = useNavigate()
	
	// Escキーでモーダルを閉じる関数
	function onKeyDown(event: KeyboardEvent) {
		if (event.key === "Escape") navigate(-1)
	}



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

	return <></>
}

export default Escaper