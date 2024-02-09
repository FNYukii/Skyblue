import { useState } from "react"
import FormModal from "../components/others/FormModal"
import DynamicTextarea from "../components/others/DynamicTextarea"
import LoadingIcon from "../components/others/LoadingIcon"
import FeedbackService from "../../utils/FeedbackService"
import { useNavigate } from "react-router-dom"

function CreateFeedbackScreen() {

	const [title, setTitle] = useState("")
	const [detail, setDetail] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()

	

	async function create() {

		setIsLoading(true)

		const result = await FeedbackService.createFeedback(title, detail)
		if (!result) {
			alert("フィードバックの作成に失敗しました")
			setIsLoading(false)

			return
		}

		navigate(-1)
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