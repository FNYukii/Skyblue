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

		return () => {
			document.removeEventListener("keydown", onKeyDown, false)
		}
		// eslint-disable-next-line
	}, [])	

	return <></>
}

export default Escaper