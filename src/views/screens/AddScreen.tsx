import { useState } from "react"
import URLModal from "../components/URLModal"
import DynamicTextarea from "../components/DynamicTextarea"
import PickImagesButtonL from "../components/PickImageButtonL"

function AddScreen() {

	const [images, setImages] = useState<File[]>([])
	const [title, setTitle] = useState("")
	const [detail, setDetail] = useState("")



	return (

		<URLModal>

			<h1 className="text-2xl font-bold">新しいスポット</h1>

			<PickImagesButtonL onPick={(images) => setImages(images)} images={images} className="mt-4" />

			<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" className="block   mt-3 w-full pb-1   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500    placeholder:text-gray-400" />

			<DynamicTextarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="コメント" className="block   mt-4 w-full pb-1   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />

			<div className="flex justify-end">
				<button className="mt-4 mr-[-1rem] mb-[-0.25rem]  px-4 py-1 font-bold rounded-full   hover:bg-gray-100 transition">投稿</button>
			</div>
		</URLModal>
	)
}

export default AddScreen