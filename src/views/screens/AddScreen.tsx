import { useState } from "react"
import URLModal from "../components/URLModal"
import DynamicTextarea from "../components/DynamicTextarea"
import PickImagesButtonL from "../components/PickImageButtonL"
import SpotService from "../../utils/SpotService"
import { useNavigate } from "react-router-dom"

function AddScreen() {

	const [images, setImages] = useState<File[]>([])
	const [title, setTitle] = useState("")
	const [comment, setComment] = useState("")

	const navigate = useNavigate()



	async function create() {

		// TODO: 画像をアップロード

		const spotId = await SpotService.createSpot([], title, comment, [])

		// 失敗した場合
		if (!spotId) {
			alert("投稿に失敗しました。")

			return
		}

		// 成功した場合
		navigate(-1)
	}



	return (

		<URLModal>

			<h1 className="text-2xl font-bold">新しいスポット</h1>

			<PickImagesButtonL onPick={(images) => setImages(images)} images={images} className="mt-4" />

			<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500    placeholder:text-gray-400" />

			<DynamicTextarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="コメント" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />

			<div className="flex justify-end">
				<button
					className="mt-4 mr-[-1rem] mb-[-0.25rem]  px-4 py-1 font-bold rounded-full   disabled:text-gray-400   enabled:hover:bg-gray-100 transition"
					disabled={images.length === 0 || title === "" || comment === ""}
					onClick={create}
				>
					投稿
				</button>
			</div>
		</URLModal>
	)
}

export default AddScreen