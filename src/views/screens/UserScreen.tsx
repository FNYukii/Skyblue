import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import User from "../../entities/User"
import UserService from "../../utils/UserService"
import LoadingIcon from "../components/others/LoadingIcon"
import { IoEllipsisHorizontal } from "react-icons/io5"
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu"
import AuthService from "../../utils/AuthService"
import '@szhsin/react-menu/dist/index.css'
import '@szhsin/react-menu/dist/transitions/slide.css'
import NavLinkToModal from "../components/others/NavLinkToModal"
import Screen from "../components/others/Screen"
import { Unsubscribe } from "firebase/firestore"
import ConfirmModal from "../components/others/ConfirmModal"
import { AiOutlineLogout } from "react-icons/ai"
import { AiOutlineEdit } from "react-icons/ai"
import { AiOutlineSetting } from "react-icons/ai"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../utils/firebase"
import Post from "../../entities/Post"
import PostService from "../../utils/PostService"
import PostList from "../components/others/PostList"



function UserScreen() {

	const { userId } = useParams()

	const [pageTitle, setPageTitle] = useState<string | null>(null)



	// プロフィール表示中のUser
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
							<img src={user.icon?.url ?? "/images/default-icon.png"} alt="User icon" className=" w-28 aspect-square rounded-full   object-cover bg-gray-200" />
							<p className="mt-2   text-2xl font-bold   max-w-full   overflow-hidden whitespace-nowrap text-ellipsis">{user.displayName}</p>
						</div>



						<div className="w-full   flex justify-between items-center   border-b border-gray-200">

							<div className="flex">
								<button onClick={() => setTab(0)} className={`block   px-8 sm:px-16 py-2   hover:bg-gray-100 transition    ${tab === 0 && "border-b-2 border-black font-bold"}`}>投稿</button>
								<button onClick={() => setTab(1)} className={`block   px-8 sm:px-16 py-2   hover:bg-gray-100 transition    ${tab === 1 && "border-b-2 border-black font-bold"}`}>いいね</button>
							</div>

							<UserMenu showUserId={user.id} />
						</div>



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



function UserMenu(props: { showUserId: string }) {

	// サインイン中のユーザーのUID
	const [myUid, setMyUid] = useState<null | string>(null)

	useEffect(() => {

		// ログイン状態を取得
		onAuthStateChanged(auth, (user) => {

			if (!user) setMyUid(null)
			if (user) setMyUid(user.uid)
		})
	}, [])



	// サインアウト確認ダイヤログ
	const [isShowSignOutModal, setIsShowSignOutModal] = useState(false)



	return (
		<>
			{props.showUserId === myUid &&
				<>
					<Menu
						menuButton={
							<MenuButton className="-m-2 p-2 rounded-full   hover:bg-gray-100 transition">
								<IoEllipsisHorizontal className="text-2xl text-gray-500" />
							</MenuButton>
						}
						transition
						arrow
						position="anchor"
					>
						<MenuItem>
							<NavLinkToModal to="/settings/profile" className="flex items-center gap-3">
								<AiOutlineEdit className="text-xl" />
								<p>プロフィールを編集</p>
							</NavLinkToModal>
						</MenuItem>

						<MenuItem>
							<NavLinkToModal to="/settings/account" className="flex items-center gap-3">
								<AiOutlineSetting className="text-xl" />
								<p>設定</p>
							</NavLinkToModal>
						</MenuItem>

						<MenuItem>
							<button onClick={() => setIsShowSignOutModal(true)} className="text-red-500   flex items-center gap-3">
								<AiOutlineLogout className="text-xl" />
								<p>サインアウト</p>
							</button>
						</MenuItem>
					</Menu>



					{isShowSignOutModal &&
						<ConfirmModal
							title="サインアウトしてもよろしいですか?"
							acceptLabel="サインアウト"
							destructive
							onClose={() => setIsShowSignOutModal(false)}
							onAccept={() => AuthService.signOut()}
						/>
					}
				</>
			}
		</>
	)
}



function UserPostList(props: {userId: string, className?: string}) {

	const [posts, setPosts] = useState<Post[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await PostService.onPostsByUserChanged(props.userId, posts => {

				setPosts(posts)
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



	return (
		<PostList posts={posts} isLoaded={isLoaded} className="mt-4"/>
	)
}



function LikePostList(props: {userId: string, className?: string}) {

	const [posts, setPosts] = useState<Post[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await PostService.onLikesByUserChanged(props.userId, posts => {

				setPosts(posts)
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


	return (
		<PostList posts={posts} isLoaded={isLoaded} noResultMessage="いいねした投稿はありません" className="mt-4" />
	)
}