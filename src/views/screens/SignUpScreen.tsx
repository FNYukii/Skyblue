import { useState } from "react"
import Screen from "../components/others/Screen"
import FormModal from "../components/others/FormModal"
import LoadingIcon from "../components/others/LoadingIcon"

function SignUpScreen() {

	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [passwordConfirm, setPasswordConfirm] = useState("")

	const [isLoading, setIsLoading] = useState(false)



	async function signUp() {

		setIsLoading(true)

		// TODO: サインアップ
		// TODO: navigate(-1)
		alert("サインアップに失敗しました。")
		setIsLoading(false)
	}



	return (

		<Screen title="サインアップ - Skyblue">

			<FormModal className="w-full sm:w-[400px]">

				<div>

					<p className="mt-4 text-2xl font-bold">サインアップ</p>

					<input value={email} onChange={e => setEmail(e.target.value)} placeholder="メールアドレス" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />
					<input value={password} onChange={e => setPassword(e.target.value)} placeholder="パスワード" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />
					<input value={passwordConfirm} onChange={e => setPasswordConfirm(e.target.value)} placeholder="パスワードを確認" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />
				</div>

				<div className="mt-4   flex justify-end">

					{!isLoading &&

						<button
							onClick={signUp}
							disabled={email === "" || password === "" || passwordConfirm === password}
							className="px-6 py-1   bg-black text-white font-bold rounded-full   disabled:bg-gray-400   enabled:hover:bg-gray-600 transition"
						>
							完了
						</button>
					}

					{isLoading &&
						<LoadingIcon className="mt-5" color="#000" />
					}
				</div>
			</FormModal>
		</Screen>
	)
}

export default SignUpScreen