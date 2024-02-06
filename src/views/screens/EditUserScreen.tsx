import Screen from "../components/parts/Screen"
import FormModal from "../components/parts/FormModal"
import UserIcon from "../components/parts/UserIcon"
import AuthService from "../../utils/AuthService"
import { useState } from "react"
import LoadingIcon from "../components/parts/LoadingIcon"



function EditUserScreen() {

	const [displayName, setDisplayName] = useState("")

	const [isLoading, setIsLoading] = useState(false)





	return (

		<Screen title="プロフィールを編集 - Skyblue">

			<FormModal>

				<div className="w-full sm:w-[400px] ">

					<h1 className="text-2xl font-bold">プロフィールを編集</h1>

					<UserIcon userId={AuthService.uidQuickly() ?? "---"} className="mt-4   w-32 mx-auto" />

					<input value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="ディスプレイネーム" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />


					<div className="mt-4   flex justify-end">

						{!isLoading &&

							<button
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
			</FormModal>
		</Screen>
	)
}

export default EditUserScreen