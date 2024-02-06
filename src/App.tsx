import { Routes, Route, useLocation } from "react-router-dom"
import TopScreen from "./views/screens/TopScreen"
import NotFoundScreen from "./views/screens/NotFoundScreen"
import Header from "./views/components/sections/Header"
import Footer from "./views/components/sections/Footer"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./utils/firebase"
import CreateSpotScreen from "./views/screens/CreateSpotScreen"
import Splash from "./views/components/sections/Splash"
import SpotScreen from "./views/screens/SpotScreen"
import UserScreen from "./views/screens/UserScreen"
import EditUserScreen from "./views/screens/EditUserScreen"

function App() {

	// サインインしているかどうか
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)



	// ログイン状態を取得
	useEffect(() => {

		onAuthStateChanged(auth, (user) => {
			if (user) {
				// ログイン済み
				setIsSignedIn(true)
			} else {

				// 未ログイン
				setIsSignedIn(false)
			}

			setIsLoaded(true)
		})
	}, [])



	// 現在のパス
	const location = useLocation()
	const currentPath = location.pathname

	// ひとつ前のパス or "/"
	const state = location.state as { previousPath?: string }
	const prevPath: string | null = state?.previousPath ?? "/"



	return (

		<div className="h-full">

			{!isLoaded &&
				<Splash />
			}



			{isLoaded && !isSignedIn &&

				<div className="h-full">

					<Header />

					<Routes location={currentPath.match(/^\/spots\/\w{20}\/images\/\d{1}$/) ? prevPath : currentPath}>

						<Route path="*" element={<NotFoundScreen />} />
						<Route path="/" element={<TopScreen />} />
						<Route path="/users/:userId" element={<UserScreen />} />
					</Routes>

					<Footer className="mt-16   sticky top-full" />

					<Routes>
						<Route path="/spots/:spotId/images/:imageNumber" element={<SpotScreen />} />
					</Routes>
				</div>
			}



			{isLoaded && isSignedIn &&

				<div className="h-full">

					<Header />

					<Routes location={currentPath === "/new" || currentPath.match(/^\/spots\/\w{20}\/images\/\d{1}$/) || currentPath === "/edit-profile" ? prevPath : currentPath}>

						<Route path="*" element={<NotFoundScreen />} />
						<Route path="/" element={<TopScreen />} />
						<Route path="/users/:userId" element={<UserScreen />} />

						<Route path="/new" element={<TopScreen />} />
					</Routes>

					<Footer className="mt-16   sticky top-full" />

					<Routes>

						<Route path="/spots/:spotId/images/:imageNumber" element={<SpotScreen />} />
						<Route path="/new" element={<CreateSpotScreen />} />
						<Route path="/edit-profile" element={<EditUserScreen />} />
					</Routes>
				</div>
			}
		</div>
	)
}

export default App
