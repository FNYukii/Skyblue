import { useState } from "react"
import Screen from "../components/others/Screen"
import FormModal from "../components/others/FormModal"
import DoneButton from "../components/buttons/DoneButton"
import AuthService from "../../utils/AuthService"
import UserService from "../../utils/UserService"
import { useNavigate } from "react-router-dom"
import PasswordInput from "../components/others/PasswordInput"

function SignUpScreen() {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")

	const [isLoading, setIsLoading] = useState(false)



	const navigate = useNavigate()



	async function signUp() {

		setIsLoading(true)

		// サインアップ
		const newUid = await AuthService.signUp(email, password)

		// サインアップに失敗したら終了
		if (!newUid) {
			alert("サインアップに失敗しました。")
			setIsLoading(false)
			return
		}

		// 新しいUserドキュメントを作成
		const newUserId = await UserService.createUser(newUid)

		// Userドキュメント作成に失敗したら終了
		if (!newUserId) {
			alert("ユーザーの作成に失敗しました。")
			AuthService.signOut()
			setIsLoading(false)
			return
		}

		navigate(-1)
	}



	return (

		<Screen title="サインアップ - Skyblue">

			<FormModal className="w-full sm:w-[400px]">

				<div>

					<p className="mt-4 text-2xl font-bold">サインアップ</p>

					<input value={email} onChange={e => setEmail(e.target.value)} placeholder="メールアドレス" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />

					<PasswordInput value={password} onChange={e => setPassword(e.target.value)} placeholder="パスワード" className="mt-6" inputClassName="w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />
					<PasswordInput value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="パスワードを確認" className="mt-6" inputClassName="w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />
				</div>

				<div className="mt-4   flex justify-end">

					<DoneButton
						onClick={signUp}
						loading={isLoading}
						disabled={email === "" || password === "" || password !== passwordConfirm}
						label="完了"
					/>
				</div>
			</FormModal>
		</Screen>
	)
}

export default SignUpScreen