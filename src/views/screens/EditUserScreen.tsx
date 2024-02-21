import Screen from "../components/others/Screen"
import FormModal from "../components/others/FormModal"
import AuthService from "../../utils/AuthService"
import { useEffect, useState } from "react"
import LoadingIcon from "../components/others/LoadingIcon"
import UserService from "../../utils/UserService"
import User from "../../entities/User"
import { useNavigate } from "react-router-dom"
import PickIconButton from "../components/buttons/PickIconButton"
import StorageService from "../../utils/StorageService"
import Image from "../../entities/Image"
import DoneButton from "../components/buttons/DoneButton"



function EditUserScreen() {

	// 現在のUser
	const [user, setUser] = useState<User | null>(null)
	const [isLoadedUser, setIsLoadedUser] = useState(false)

	useEffect(() => {

		(async () => {

			const user = await UserService.readUser(AuthService.uidQuickly() ?? "---")

			setUser(user)
			setIsLoadedUser(true)
		})()
	}, [])



	return (

		<Screen title="プロフィールを編集 - Skyblue" noHeaderAndFooter>

			<FormModal className="w-full sm:w-[400px]">

				{!isLoadedUser &&
					<LoadingIcon center />
				}

				{isLoadedUser && user === null &&
					<p className="text-center text-gray-500">読み取りに失敗しました</p>
				}

				{isLoadedUser && user !== null &&

					<Editor user={user} />
				}
			</FormModal>
		</Screen>
	)
}

export default EditUserScreen



function Editor(props: { user: User }) {


	const navigate = useNavigate()

	// 入力内容
	const [iconFile, setIconFile] = useState<File | null>(null)
	const [displayName, setDisplayName] = useState(props.user.displayName)

	// 更新中かどうか
	const [isLoading, setIsLoading] = useState(false)



	async function edit() {

		setIsLoading(true)

		let iconImage: Image | null = null

		// 画像が選択されたらならアップロード
		if (iconFile) {
			iconImage = await StorageService.uploadImage(iconFile, "/icons")

			if (!iconImage) {
				alert("新しいアイコンのアップロードに失敗しました")
				setIsLoading(false)
				return
			}
		}

		// 画像が選択されたなら古い画像は削除
		if (iconFile && props.user.icon) {
			const result = await StorageService.deleteImage(props.user.icon.path)
			if (!result) {
				alert("古いアイコンの削除に失敗しました")
				setIsLoading(false)
				return
			}
		}

		// ドキュメントを更新
		const result = await UserService.editProfile(displayName, iconImage ?? undefined)
		if (!result) {
			alert("プロフィールの更新に失敗しました")
			setIsLoading(false)
			return
		}

		navigate(-1)
	}



	return (
		<div>
			<h1 className="text-2xl font-bold">プロフィールを編集</h1>

			<PickIconButton iconUrl={props.user.icon?.url ?? "/images/default-icon.png"} file={iconFile ?? undefined} onPick={file => setIconFile(file)} className="mt-4 mx-auto w-fit" />
			<input autoFocus value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="ディスプレイネーム" className="block   mt-6 w-full pb-2   border-b border-gray-300   outline-none focus:border-blue-500   placeholder:text-gray-400" />

			<div className="mt-4   flex justify-end">

				<DoneButton
					onClick={edit}
					loading={isLoading}
					disabled={displayName === ""}
					label="完了"
				/>
			</div>
		</div>
	)
}