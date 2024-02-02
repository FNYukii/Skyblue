import { useEffect, useState } from "react"
import LoadingIcon from "../components/others/LoadingIcon"

function SplashScreen() {

	// ロードサークルを表示するかどうか
	const [isShowLoading, setIsShowLoading] = useState(false)

	// 一定時間数える
	useEffect(() => {
		setTimeout(() => {
			setIsShowLoading(true)
		}, 1000)
	}, [])



	// 画面スクロール無効
	useEffect(() => {

		document.body.style.overflowY = "hidden"

		return () => {
			document.body.style.overflowY = ""
		}
		// eslint-disable-next-line
	}, [])

	return (

		<div className="fixed z-10   top-0 left-0 w-screen h-screen    bg-white   flex justify-center items-center">

			<div className="flex flex-col items-center   gap-4">

				<h1 className="text-center text-5xl font-light">Skyblue</h1>

				<LoadingIcon className={isShowLoading ? "" : "opacity-0"} />
			</div>
		</div>
	)
}

export default SplashScreen