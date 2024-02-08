import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import User from "../../entities/User"
import UserService from "../../utils/UserService"
import LoadingIcon from "../components/others/LoadingIcon"
import UserPostList from "../components/sections/UserPostList"
import { IoEllipsisHorizontal } from "react-icons/io5"
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu"
import AuthService from "../../utils/AuthService"
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import LikePostList from "../components/sections/LikePostList"
import NavLinkToModal from "../components/others/NavLinkToModal"
import Screen from "../components/others/Screen"
import { Unsubscribe } from "firebase/firestore"
import ConfirmModal from "../components/others/ConfirmModal"
import StorageService from "../../utils/StorageService"



function UserScreen() {

	const { userId } = useParams()

	const [pageTitle, setPageTitle] = useState<string | null>(null)



	// User関連のState
	const [user, setUser] = useState<User | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await UserService.onUserChanged(userId ?? "---", user => {

				setPageTitle(`${user?.displayName ?? "ユーザー"} - Skyblue`)
				setUser(user)
				setIsLoaded(true)

			}, (error) => {

				setIsLoaded(true)
			})
		})()

		return () => {
			if (unsubscribe) unsubscribe()
		}
		// eslint-disable-next-line
	}, [])



	// タブバーの状態
	const [tab, setTab] = useState(0)

	// サインアウト確認大ログ
	const [isShowSignOutModal, setIsShowSignOutModal] = useState(false)



	return (

		<Screen title={pageTitle ?? "ユーザー - Skyblue"}>

			<div className="h-full">

				{!isLoaded &&
					<div className="h-[40%] flex flex-col justify-end">
						<LoadingIcon center large className="mt-16" />
					</div>
				}

				{isLoaded && user === null &&
					<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
				}

				{isLoaded && user !== null &&

					<div>



						<div className="w-full   flex flex-col items-center">
							<img src={user.icon?.url ?? StorageService.defaultIconUrl()} alt="User icon" className=" w-28 aspect-square rounded-full   object-cover bg-gray-200" />
							<p className="mt-2   text-2xl font-bold   max-w-full   overflow-hidden whitespace-nowrap text-ellipsis">{user.displayName}</p>
						</div>



						<div className="w-full   flex justify-between items-center   border-b border-gray-200">

							<div className="flex">
								<button onClick={() => setTab(0)} className={`block   px-8 sm:px-16 py-2   hover:bg-gray-100 transition    ${tab === 0 && "border-b-2 border-black font-bold"}`}>投稿</button>
								<button onClick={() => setTab(1)} className={`block   px-8 sm:px-16 py-2   hover:bg-gray-100 transition    ${tab === 1 && "border-b-2 border-black font-bold"}`}>いいね</button>
							</div>

							<Menu
								menuButton={
									<MenuButton className="mr-[-0.5rem]   p-2 rounded-full   hover:bg-gray-100 transition">
										<IoEllipsisHorizontal className="text-2xl text-gray-500" />
									</MenuButton>
								}
								transition
								arrow
								position="anchor"
							>
								<MenuItem>
									<NavLinkToModal to="/edit-profile">プロフィールを編集</NavLinkToModal>
								</MenuItem>

								<MenuItem>
									<button onClick={() => setIsShowSignOutModal(true)} className="text-red-500">サインアウト</button>
								</MenuItem>
							</Menu>
						</div>



						{isShowSignOutModal &&
							<ConfirmModal
								title="サインアウトしてもよろしいですか?"
								acceptLabel="サインアウト"
								destructive
								onClose={() => setIsShowSignOutModal(false)}
								onAccept={() => AuthService.signOut()}
							/>
						}
						


						<div>
							{tab === 0 &&
								<UserPostList userId={userId!} className="mt-4" />
							}

							{tab === 1 &&
								<LikePostList userId={userId!} className="mt-4" />
							}
						</div>
					</div>
				}
			</div>
		</Screen>
	)
}

export default UserScreen