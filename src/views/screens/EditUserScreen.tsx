import Screen from "../components/parts/Screen"
import FormModal from "../components/parts/FormModal"
import AuthService from "../../utils/AuthService"
import { useEffect, useState } from "react"
import LoadingIcon from "../components/parts/LoadingIcon"
import UserService from "../../utils/UserService"
import User from "../../entities/User"
import { useNavigate } from "react-router-dom"



function EditUserScreen() {

	const navigate = useNavigate()

	// 入力内容
	const [displayName, setDisplayName] = useState("")

	// 現在のUser
	const [user, setUser] = useState<User | null>(null)
	const [isLoadedUser, setIsLoadedUser] = useState(false)

	useEffect(() => {

		(async () => {

			const user = await UserService.readUser(AuthService.uidQuickly() ?? "---")

			setUser(user)
			setIsLoadedUser(true)

			if (user) setDisplayName(user.displayName)
		})()
	}, [])



	const [isLoading, setIsLoading] = useState(false)

	async function edit() {

		setIsLoading(true)

		const result = await UserService.editProfile(displayName)
		if (!result) {
			alert("プロフィールの更新に失敗しました")
			setIsLoading(false)
			return
		}

		navigate(-1)
	}



	return (

		<Screen title="プロフィールを編集 - Skyblue">

			<FormModal>

				<div className="w-full sm:w-[400px] ">

					{!isLoadedUser &&
						<LoadingIcon  center />
					}

					{isLoadedUser && user === null &&
						<p className="text-center text-gray-500">読み取りに失敗しました</p>
					}

					{isLoadedUser && user !== null &&

						<div>
							<h1 className="text-2xl font-bold">プロフィールを編集</h1>

							<img src={user.iconUrl} alt="User icon" className="mt-4 mx-auto   w-32 aspect-square rounded-full   bg-gray/50" />
							<input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="ディスプレイネーム" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />

							<div className="mt-4   flex justify-end">

								{!isLoading &&

									<button
										onClick={edit}
										disabled={displayName === ""}
										className="px-6 py-1   bg-black text-white font-bold rounded-full   disabled:bg-gray-400   enabled:hover:bg-gray-600 transition"
									>
										完了
									</button>
								}

								{isLoading &&
									<LoadingIcon className="mt-5" color="#000" />
								}
							</div>
						</div>
					}
				</div>
			</FormModal>
		</Screen>
	)
}

export default EditUserScreen