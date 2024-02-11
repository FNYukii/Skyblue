import { NavLink } from "react-router-dom"
import AuthService from "../../../utils/AuthService"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "../../../utils/firebase"
import SignInWithGoogleButton from "../buttons/SignInWithGoogleButton"
import NavLinkToModal from "../others/NavLinkToModal"
import { AiOutlineUser } from "react-icons/ai"
import { AiOutlinePlus } from "react-icons/ai"
import { AiOutlineSetting } from "react-icons/ai"



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
				<div className="flex gap-12">
					<NavLinkToModal to="/sign-up" className="-my-2 -mx-6   py-2 px-6   rounded-full   hover:bg-gray-100 transition">サインアップ</NavLinkToModal>
				</div>
			}

			{isLoaded && isSignedIn &&
				<div>

					<div className="sm:hidden   flex gap-6 items-center">

						<NavLink to={`/users/${AuthService.uidQuickly()}`} className="-m-2 p-2   rounded-full   hover:bg-gray-100 transition">
							<AiOutlineUser className="text-2xl" />
						</NavLink>

						<NavLink to="/settings/account" className="-m-2 p-2   rounded-full   hover:bg-gray-100 transition">
							<AiOutlineSetting className="text-2xl" />
						</NavLink>

						<NavLinkToModal to="new" className="p-2 bg-black text-white rounded-full   flex items-center   hover:bg-gray-600 transition">
							<AiOutlinePlus className="text-2xl" />
						</NavLinkToModal>
					</div>

					<div className="hidden sm:flex items-center gap-12">
						<NavLink to={`/users/${AuthService.uidQuickly()}`} className="-my-2 -mx-6   py-2 px-6   rounded-full   hover:bg-gray-100 transition">プロフィール</NavLink>
						<NavLink to="/settings/account" className="-my-2 -mx-6   py-2 px-6   rounded-full   hover:bg-gray-100 transition">設定</NavLink>
						<NavLinkToModal to="new" className="px-6 py-2   bg-black text-white font-bold rounded-full   hover:bg-gray-600 transition">新しい投稿</NavLinkToModal>
					</div>
				</div>
			}
		</header>
	)
}

export default Header