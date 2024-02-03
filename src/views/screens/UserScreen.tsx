import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import User from "../../entities/User"
import UserService from "../../utils/UserService"
import LoadingIcon from "../components/others/LoadingIcon"
import UserSpotList from "../components/sections/UserSpotList"
import { IoEllipsisHorizontal } from "react-icons/io5"
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu"
import AuthService from "../../utils/AuthService"
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'



function UserScreen() {

	document.title = "ユーザー - Skyline"

	const { userId } = useParams()



	// User関連のState
	const [user, setUser] = useState<User | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {

		(async () => {

			const user = await UserService.readUser(userId ?? "")
			setUser(user)
			setIsLoaded(true)
		})()

		// eslint-disable-next-line
	}, [])



	// タブバーの状態
	const [tab, setTab] = useState(0)



	return (

		<div className="h-full">

			{!isLoaded &&
				<div className="h-[40%] flex flex-col justify-end">
					<LoadingIcon center className="mt-16" />
				</div>
			}

			{isLoaded && user === null &&
				<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
			}

			{isLoaded && user !== null &&

				<div className="relative">

					<Menu
						menuButton={
							<MenuButton className="absolute top-0 right-0   mt-[-0.5rem] mr-[-0.5rem]   p-2 rounded-full   hover:bg-gray-100 transition">
								<IoEllipsisHorizontal className="text-2xl text-gray-500" />
							</MenuButton>
						}
						transition
						arrow
						position="anchor"
					>
						<MenuItem>
							<button onClick={() => AuthService.signOut()}>Sign Out</button>
						</MenuItem>
					</Menu>

					<div className="w-full   flex flex-col items-center">
						<img src={user.iconUrl} alt="User icon" className=" w-28 aspect-square rounded-full bg-gray-200" />
						<p className="mt-2   text-2xl font-bold">{user.displayName}</p>
					</div>



					<div className="w-full border-b border-gray-200">

						<button onClick={() => setTab(0)} className={`px-16 py-2   hover:bg-gray-100 transition    ${tab === 0 && "border-b-2 border-black font-bold"}`}>投稿</button>
						<button onClick={() => setTab(1)} className={`px-16 py-2   hover:bg-gray-100 transition    ${tab === 1 && "border-b-2 border-black font-bold"}`}>いいね</button>
					</div>

					<div>
						{tab === 0 &&
							<UserSpotList userId={userId!} className="mt-4" />
						}

						{tab === 1 &&
							<div>
								<p className="mt-8   text-center text-gray-500">いいねしたスポットはありません</p>
							</div>
						}
					</div>
				</div>
			}
		</div>
	)
}

export default UserScreen