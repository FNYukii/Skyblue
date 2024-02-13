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
import FeedbackScreen from "./views/screens/FeedbackScreen"
import CreateFeedbackScreen from "./views/screens/CreateFeedbackScreen"
import AboutScreen from "./views/screens/AboutScreen"
import SignUpScreen from "./views/screens/SignUpScreen"
import SignInScreen from "./views/screens/SignInScreen"

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

					<div>

						<Header />

						<Routes location={currentPath.match(/^\/posts\/\w+\/images\/\w+$/) || ["/sign-up", "/sign-in"].includes(currentPath) ? prevPath : currentPath}>

							<Route path="*" element={<NotFoundScreen />} />
							<Route path="/" element={<TopScreen />} />
							<Route path="/users/:userId" element={<UserScreen />} />
						</Routes>

						<Footer className="mt-16   sticky top-full" />
					</div>

					<Routes>
						<Route path="*" element={<></>} />
						<Route path="/posts/:postId/images/:imageNumber" element={<PostScreen />} />

						<Route path="/sign-up" element={<SignUpScreen />} />
						<Route path="/sign-in" element={<SignInScreen />} />
					</Routes>
				</div>
			}



			{isLoaded && isSignedIn &&

				<div>

					<div>

						<Header />

						<Routes location={currentPath.match(/^\/posts\/\w+\/images\/\w+$/) || ["/new", "/settings/profile", "/settings/feedback/new"].includes(currentPath) ? prevPath : currentPath}>

							<Route path="*" element={<NotFoundScreen />} />
							<Route path="/" element={<TopScreen />} />
							<Route path="/users/:userId" element={<UserScreen />} />
							<Route path="/settings/account" element={<AccountScreen />} />
							<Route path="/settings/feedback" element={<FeedbackScreen />} />
							<Route path="/settings/about" element={<AboutScreen />} />
						</Routes>

						<Footer className="mt-16   sticky top-full" />
					</div>

					<Routes>

						<Route path="*" element={<></>} />
						<Route path="/posts/:postId/images/:imageNumber" element={<PostScreen />} />
						<Route path="/new" element={<CreatePostScreen />} />
						<Route path="/settings/profile" element={<EditUserScreen />} />
						<Route path="/settings/feedback/new" element={<CreateFeedbackScreen />} />
					</Routes>
				</div>
			}
		</div>
	)
}

export default App
