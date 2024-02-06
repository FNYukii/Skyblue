import { NavLink } from "react-router-dom"
import Screen from "../components/parts/Screen"

function NotFoundScreen() {

	return (

		<Screen title="404 - Skyblue">

			<div className="text-center">

				<p className="mt-16 font-bold text-3xl">Page not found</p>
				<p className="mt-1">このページは存在しないか、現在のサインイン状態ではアクセスできません</p>

				<NavLink to="/" className="inline-block mt-4   px-6 py-2   bg-black text-white font-bold rounded-full   hover:bg-gray-600 transition">トップへ戻る</NavLink>
			</div>
		</Screen>
	)
}

export default NotFoundScreen