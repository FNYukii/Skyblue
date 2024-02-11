import { useState } from "react"
import FormModal from "../components/others/FormModal"
import DynamicTextarea from "../components/others/DynamicTextarea"
import FeedbackService from "../../utils/FeedbackService"
import { useNavigate } from "react-router-dom"
import Screen from "../components/others/Screen"
import DoneButton from "../components/buttons/DoneButton"

function CreateFeedbackScreen() {

	const [title, setTitle] = useState("")
	const [detail, setDetail] = useState("")

	const [isLoading, setIsLoading] = useState(false)
	const [isCreated, setIsCreated] = useState(false)

	const navigate = useNavigate()



	async function create() {

		setIsLoading(true)

		const result = await FeedbackService.createFeedback(title, detail)
		if (!result) {
			alert("フィードバックの作成に失敗しました")
			setIsLoading(false)

			return
		}

		setIsCreated(true)
	}



	return (

		<Screen title="フィードバックを作成 - Skyblue">

			<FormModal className="w-full sm:w-[400px]">

				{!isCreated &&
					<>
						<h1 className="text-2xl font-bold">フィードバックを作成</h1>

						<input value={title} onChange={e => setTitle(e.target.value)} placeholder="件名" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />
						<DynamicTextarea value={detail} onChange={e => setDetail(e.target.value)} placeholder="詳細" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />

						<div className="mt-4   flex justify-end">

							<DoneButton
								onClick={create}
								loading={isLoading}
								disabled={title === "" || detail === ""}
								label="完了"
							/>
						</div>
					</>
				}

				{isCreated &&
					<div>
						<p className="text-2xl font-bold text-center">ありがとうございました</p>
						<p className="mt-2 text-center">いただいた意見は今後の開発の参考にさせていただきます。</p>

						<button onClick={() => navigate(-1)} className="block mx-auto mt-4   px-6 py-1   bg-black text-white font-bold rounded-full   disabled:bg-gray-400   enabled:hover:bg-gray-600 transition">戻る</button>
					</div>
				}
			</FormModal>
		</Screen>
	)
}

export default CreateFeedbackScreen