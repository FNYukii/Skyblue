import { Routes, Route, useLocation } from "react-router-dom"
import TopScreen from "./views/screens/TopScreen"
import NotFoundScreen from "./views/screens/NotFoundScreen"
import Header from "./views/components/sections/Header"
import Footer from "./views/components/sections/Footer"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./utils/firebase"
import CreatePostScreen from "./views/screens/CreatePostScreen"
import Splash from "./views/components/sections/Splash"
import PostScreen from "./views/screens/PostScreen"
import UserScreen from "./views/screens/UserScreen"
import EditUserScreen from "./views/screens/EditUserScreen"
import AccountScreen from "./views/screens/AccountScreen"

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
	const prevPath = state?.previousPath ?? "/"



	return (

		<div>

			{!isLoaded &&
				<Splash />
			}



			{isLoaded && !isSignedIn &&

				<div>

					<div className="h-screen">

						<Header />

						<Routes location={currentPath.match(/^\/posts\/\w{20}\/images\/\d{1}$/) ? prevPath : currentPath}>

							<Route path="*" element={<NotFoundScreen />} />
							<Route path="/" element={<TopScreen />} />
							<Route path="/users/:userId" element={<UserScreen />} />
						</Routes>

						<Footer className="mt-16   sticky top-full" />
					</div>

					<Routes>
						<Route path="*" element={<></>} />
						<Route path="/posts/:postId/images/:imageNumber" element={<PostScreen />} />
					</Routes>
				</div>
			}



			{isLoaded && isSignedIn &&

				<div>

					<div className="h-screen">

						<Header />

						<Routes location={currentPath === "/new" || currentPath.match(/^\/posts\/\w{20}\/images\/\d{1}$/) || currentPath === "/settings/profile" ? prevPath : currentPath}>

							<Route path="*" element={<NotFoundScreen />} />
							<Route path="/" element={<TopScreen />} />
							<Route path="/users/:userId" element={<UserScreen />} />
							<Route path="/settings/account" element={<AccountScreen />} />
						</Routes>

						<Footer className="mt-16   sticky top-full" />
					</div>

					<Routes>

						<Route path="*" element={<></>} />
						<Route path="/posts/:postId/images/:imageNumber" element={<PostScreen />} />
						<Route path="/new" element={<CreatePostScreen />} />
						<Route path="/settings/profile" element={<EditUserScreen />} />
					</Routes>
				</div>
			}
		</div>
	)
}

export default App
