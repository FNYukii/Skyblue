import { useEffect } from "react"

function Fixer() {

	useEffect(() => {

		// 画面スクロール無効
		document.body.style.overflowY = "hidden"

		return () => {
			document.body.style.overflowY = ""
		}
		// eslint-disable-next-line
	}, [])

	return null
}

export default Fixer