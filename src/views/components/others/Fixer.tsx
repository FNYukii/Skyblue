import { useEffect } from "react"

function Fixer() {

	// 画面スクロール無効
	useEffect(() => {
		document.body.style.overflowY = "hidden"

		return () => {
			document.body.style.overflowY = ""
		}
		// eslint-disable-next-line
	}, [])

	return null
}

export default Fixer