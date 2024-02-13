import { NavLink } from "react-router-dom"
import AuthService from "../../../utils/AuthService"
import { onAuthStateChanged } from "firebase/auth"
import { useState, useEffect } from "react"
import { auth } from "../../../utils/firebase"
import NavLinkToModal from "../others/NavLinkToModal"
import { AiOutlineMenu } from "react-icons/ai"
import { AiOutlineClose } from "react-icons/ai"



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
				<>
					<HamburgerMenu className="sm:hidden" isSignedIn={false} />

					<div className="hidden sm:flex gap-12 items-center">
						<NavLinkToModal to="/sign-in" className="-my-2 -mx-6   py-2 px-6   rounded-full   hover:bg-gray-100 transition">サインイン</NavLinkToModal>
						<NavLinkToModal to="/sign-up" className="px-6 py-2   bg-black text-white font-bold rounded-full   hover:bg-gray-600 transition">サインアップ</NavLinkToModal>
					</div>
				</>
			}

			{isLoaded && isSignedIn &&
				<>
					<HamburgerMenu className="sm:hidden" isSignedIn={true} />

					<div className="hidden sm:flex items-center gap-12">
						<NavLink to={`/users/${AuthService.uidQuickly()}`} className="-my-2 -mx-6   py-2 px-6   rounded-full   hover:bg-gray-100 transition">プロフィール</NavLink>
						<NavLink to="/settings/account" className="-my-2 -mx-6   py-2 px-6   rounded-full   hover:bg-gray-100 transition">設定</NavLink>
						<NavLinkToModal to="new" className="px-6 py-2   bg-black text-white font-bold rounded-full   hover:bg-gray-600 transition">新しい投稿</NavLinkToModal>
					</div>
				</>
			}
		</header>
	)
}

export default Header




function HamburgerMenu(props: { isSignedIn: boolean, className?: string }) {

	const [isOpen, setIsOpen] = useState(false)



	return (

		<div className={props.className}>

			<button className="-m-3 p-3   rounded-full   hover:bg-gray-100 transition" onClick={() => setIsOpen(true)}>
				<AiOutlineMenu className="text-2xl" />
			</button>


			{isOpen &&

				<div className="z-10   fixed top-0 left-0 w-screen h-screen   bg-black/50   flex justify-between items-start">

					<div onClick={() => setIsOpen(false)} className="absolute top-0 left-0 w-screen h-screen   flex justify-end items-start">

						<button className="mt-1 mr-1   p-3 rounded-full   hover:bg-white/10 transition">
							<AiOutlineClose className="text-2xl text-white" />
						</button>
					</div>



					<div className="absolute top-0 left-0   w-fit h-screen   bg-white px-4   flex flex-col items-start">

						<NavLink onClick={() => setIsOpen(false)} to="/" className="mt-4   text-3xl font-light">Skyblue</NavLink>

						{!props.isSignedIn &&
							<div className="mt-8   flex flex-col items-   gap-4">

								<NavLinkToModal onClick={() => setIsOpen(false)} to="/sign-in" className="-my-2 -mx-4   py-2 px-4   rounded-full   hover:bg-gray-100 transition">サインイン</NavLinkToModal>
								<NavLinkToModal onClick={() => setIsOpen(false)} to="/sign-up" className="py-2 px-4   bg-black text-white font-bold rounded-full   hover:bg-gray-600 transition">サインアップ</NavLinkToModal>
							</div>
						}



						{props.isSignedIn &&
							<div className="mt-8   flex flex-col items-   gap-4">

								<NavLink onClick={() => setIsOpen(false)} to={`/users/${AuthService.uidQuickly()}`} className="-my-2 -mx-4   py-2 px-4   rounded-full   hover:bg-gray-100 transition">プロフィール</NavLink>
								<NavLink onClick={() => setIsOpen(false)} to="/settings/account" className="-my-2 -mx-4   py-2 px-4   rounded-full   hover:bg-gray-100 transition">設定</NavLink>

								<NavLinkToModal onClick={() => setIsOpen(false)} to="new" className="px-6 py-2   bg-black text-white font-bold rounded-full   hover:bg-gray-600 transition">新しい投稿</NavLinkToModal>
							</div>
						}

					</div>
				</div>
			}
		</div>
	)
}