import { NavLink } from "react-router-dom"
import AuthService from "../../utils/AuthService"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "../../utils/firebase"

function Header() {



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

		<header className="mx-auto   w-full lg:w-[1024px]   px-4 lg:px-0   py-4   flex justify-between items-center">

			<NavLink to="/" className="text-3xl font-light">Skyblue</NavLink>

			{!isLoaded &&
				<p>Loading...</p>
			}

			{isLoaded && !isSignedIn &&
				<button onClick={() => AuthService.signInWithGoogle()} className="hover:underline">Sign In</button>
			}

			{isLoaded && isSignedIn &&
				<div className="flex gap-4">

					<NavLink to="new" className="hover:underline">New Spot</NavLink>
					<button onClick={() => AuthService.signOut()} className="hover:underline">Sign Out</button>
				</div>
			}
		</header>
	)
}

export default Header