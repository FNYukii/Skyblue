import { NavLink } from "react-router-dom"
import AuthService from "../../../utils/AuthService"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "../../../utils/firebase"
import SignInWithGoogleButton from "../parts/SignInWithGoogleButton"
import NavLinkToModal from "../parts/NavLinkToModal"

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
				<div className="flex gap-4 items-center">

					<NavLink to={`/users/${AuthService.uidQuickly()}`} className="px-6 py-1   rounded-full   hover:bg-gray-100 transition">プロフィール</NavLink>
					<NavLinkToModal to="new" className="px-6 py-2   bg-black text-white font-bold rounded-full   hover:bg-gray-600 transition">新しいスポット</NavLinkToModal>
				</div>
			}
		</header>
	)
}

export default Header