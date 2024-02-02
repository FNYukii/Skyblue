import { BrowserRouter, Routes, Route } from "react-router-dom"
import TopScreen from "./views/screens/TopScreen"
import NotFoundScreen from "./views/screens/NotFoundScreen"
import Header from "./views/components/Header"
import Footer from "./views/components/Footer"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "./utils/firebase"
import AddScreen from "./views/screens/AddScreen"

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

				<div>
					<p>Splash Screen here.</p>
				</div>
			}



			{isLoaded && !isSignedIn &&

				<div className="h-full">

					<Header />

					<main className="mx-auto   w-full lg:w-[1024px]   px-4 lg:px-0">

						<Routes>
							<Route path="/" element={<TopScreen />} />
							<Route path="*" element={<NotFoundScreen />} />
						</Routes>
					</main>

					<Footer className="mt-16   sticky top-full" />
				</div>
			}



			{isLoaded && isSignedIn &&

				<div className="h-full">

					<Header />

					<main className="mx-auto   w-full lg:w-[1024px]   px-4 lg:px-0">

						<Routes>
							<Route path="/" element={<TopScreen />} />
							<Route path="/new" element={<TopScreen />} />
							<Route path="*" element={<NotFoundScreen />} />
						</Routes>
					</main>

					<Footer className="mt-16   sticky top-full" />



					<Routes>
						<Route path="/new" element={<AddScreen />} />
						<Route path="*" element={<></>} />
					</Routes>
				</div>
			}
		</BrowserRouter>
	)
}

export default App
