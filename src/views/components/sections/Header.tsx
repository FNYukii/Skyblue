import { NavLink } from "react-router-dom"
import AuthService from "../../../utils/AuthService"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "../../../utils/firebase"
import SignInWithGoogleButton from "../others/SignInWithGoogleButton"

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
				<SignInWithGoogleButton />
			}

			{isLoaded && isSignedIn &&
				<div className="flex gap-6">

					<NavLink to="new" className="hover:underline">新しいスポット</NavLink>
					<button onClick={() => AuthService.signOut()} className="hover:underline">Sign Out</button>
				</div>
			}
		</header>
	)
}

export default Header