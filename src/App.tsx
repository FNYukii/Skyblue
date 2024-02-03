import { BrowserRouter, Routes, Route } from "react-router-dom"
import TopScreen from "./views/screens/TopScreen"
import NotFoundScreen from "./views/screens/NotFoundScreen"
import Header from "./views/components/sections/Header"
import Footer from "./views/components/sections/Footer"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./utils/firebase"
import CreateSpotScreen from "./views/screens/CreateSpotScreen"
import SplashScreen from "./views/screens/SplashScreen"
import SpotScreen from "./views/screens/SpotScreen"

function App() {

	// サインインしているかどうか
	const [isSignedIn, setIsSignedIn] = useState(false)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		// ログイン状態を取得
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

	return (

		<BrowserRouter>

			{!isLoaded &&
				<SplashScreen />
			}



			{isLoaded &&

				<div className="h-full">

					<Header />

					<main className="mx-auto   w-full lg:w-[1024px]   px-4 lg:px-0">

						<Routes>
							<Route path="*" element={<NotFoundScreen />} />
							<Route path="/" element={<TopScreen />} />
							<Route path="/spots/:spotId" element={<TopScreen />} />

							{isSignedIn &&
								<Route path="/new" element={<TopScreen />} />
							}
						</Routes>
					</main>

					<Footer className="mt-16   sticky top-full" />



					<Routes>

						<Route path="*" element={<></>} />


						{isSignedIn &&
							<Route path="/new" element={<CreateSpotScreen />} />
						}

						<Route path="/spots/:spotId" element={<SpotScreen />} />
					</Routes>
				</div>
			}
		</BrowserRouter>
	)
}

export default App
