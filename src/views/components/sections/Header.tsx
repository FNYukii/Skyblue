import { NavLink } from "react-router-dom"
import AuthService from "../../../utils/AuthService"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "../../../utils/firebase"
import SignInWithGoogleButton from "../parts/SignInWithGoogleButton"
import NavLinkToModal from "../parts/NavLinkToModal"
import { AiOutlineUser } from "react-icons/ai"
import { AiOutlinePlus } from "react-icons/ai"



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

		<header className="mx-auto   w-full xl:w-[1280px]   px-4 xl:px-0   py-4   flex justify-between items-center">

			<NavLink to="/" className="text-3xl font-light">Skyblue</NavLink>

			{!isLoaded &&
				<p>Loading...</p>
			}

			{isLoaded && !isSignedIn &&
				<SignInWithGoogleButton />
			}

			{isLoaded && isSignedIn &&
				<div>

					<div className="sm:hidden   flex gap-4 items-center">

						<NavLink to={`/users/${AuthService.uidQuickly()}`} className="p-2 rounded-full   hover:bg-gray-100 transition">
							<AiOutlineUser className="text-2xl" />
						</NavLink>

						<NavLinkToModal to="new" className="p-2 bg-black text-white rounded-full   flex items-center gap-1   hover:bg-gray-600 transition">
							<AiOutlinePlus className="text-2xl" />
						</NavLinkToModal>
					</div>

					<div className="hidden sm:block   flex items-center">
						<NavLink to={`/users/${AuthService.uidQuickly()}`} className="px-6 py-2   rounded-full   hover:bg-gray-100 transition">プロフィール</NavLink>
						<NavLinkToModal to="new" className="ml-2   px-6 py-2   bg-black text-white font-bold rounded-full   hover:bg-gray-600 transition">新しいスポット</NavLinkToModal>
					</div>
				</div>
			}
		</header>
	)
}

export default Header