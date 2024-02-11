import { useState } from "react"
import DoneButton from "../components/buttons/DoneButton"
import FormModal from "../components/others/FormModal"
import Screen from "../components/others/Screen"
import AuthService from "../../utils/AuthService"
import { useNavigate } from "react-router-dom"

function SignInScreen() {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")

	const [isLoading, setIsLoading] = useState(false)



	const navigate = useNavigate()



	async function signUp() {

		setIsLoading(true)

		// サインイン
		const result = await AuthService.signIn(email, password)

		// サインインに失敗したら終了
		if (!result) {
			alert("サインインに失敗しました。")
			setIsLoading(false)
			return
		}

		navigate(-1)
	}



	return (

		<Screen title="サインイン - Skyblue">

			<FormModal className="w-full sm:w-[400px]">

				<div>

					<p className="mt-4 text-2xl font-bold">サインイン</p>

					<input value={email} onChange={e => setEmail(e.target.value)} placeholder="メールアドレス" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />
					<input value={password} onChange={e => setPassword(e.target.value)} placeholder="パスワード" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />
				</div>

				<div className="mt-4   flex justify-end">

					<DoneButton
						onClick={signUp}
						loading={isLoading}
						disabled={email === "" || password === ""}
						label="完了"
					/>
				</div>
			</FormModal>
		</Screen>
	)
}

export default SignInScreen