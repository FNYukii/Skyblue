import { useState } from "react"
import FormModal from "../components/others/FormModal"
import DynamicTextarea from "../components/others/DynamicTextarea"
import LoadingIcon from "../components/others/LoadingIcon"

function CreateFeedbackScreen() {

	const [title, setTitle] = useState("")
	const [detail, setDetail] = useState("")
	const [isLoading, setIsLoading] = useState(false)



	async function create() {
		setIsLoading(true)

		//TODO: フィードバックを作成
		await new Promise(resolve => setTimeout(resolve, 500))
		alert("フィードバックの作成に失敗しました。この機能は未実装です。")

		setIsLoading(false)
	}



	return (

		<FormModal className="w-full sm:w-[400px]">

			<h1 className="text-2xl font-bold">フィードバックを作成</h1>

			<input value={title} onChange={e => setTitle(e.target.value)} placeholder="件名" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />
			<DynamicTextarea value={detail} onChange={e => setDetail(e.target.value)} placeholder="詳細" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />

			<div className="mt-4   flex justify-end">

				{!isLoading &&

					<button
						onClick={create}
						disabled={title === "" || detail === ""}
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
	)
}

export default CreateFeedbackScreen