import { useState } from "react"
import URLModal from "../components/URLModal"
import DynamicTextarea from "../components/DynamicTextarea"
import PickImagesButtonL from "../components/PickImageButtonL"
import SpotService from "../../utils/SpotService"
import { useNavigate } from "react-router-dom"
import StorageService from "../../utils/StorageService"
import LoadingIcon from "../components/LoadingIcon"

function AddScreen() {

	const [images, setImages] = useState<File[]>([])
	const [title, setTitle] = useState("")
	const [comment, setComment] = useState("")

	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()



	async function create() {

		setIsLoading(true)

		// 画像をアップロード
		const imageUrls = await StorageService.uploadImages(images, "/images")

		// 失敗した場合
		if (!imageUrls) {
			alert("画像のアップロードに失敗しました。")
			setIsLoading(false)
			return
		}

		// Spotを投稿
		const spotId = await SpotService.createSpot(imageUrls, title, comment, [])

		// 失敗した場合
		if (!spotId) {
			alert("スポットの投稿に失敗しました。")
			setIsLoading(false)
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

				{!isLoading &&

					<button
						className="mt-4 mr-[-1rem] mb-[-0.25rem]  px-4 py-1 font-bold rounded-full   disabled:text-gray-400   enabled:hover:bg-gray-100 transition"
						disabled={images.length === 0 || title === "" || comment === ""}
						onClick={create}
					>
						投稿
					</button>
				}

				{isLoading &&
					<LoadingIcon className="mt-5" black />
				}
			</div>
		</URLModal>
	)
}

export default AddScreen