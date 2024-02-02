import { useState } from "react"
import URLModal from "../components/URLModal"
import PickImagesButton from "../components/PickImagesButton"
import ImageFileGrid from "../components/ImageFileGrid"
import DynamicTextarea from "../components/DynamicTextarea"

function AddScreen() {

	const [images, setImages] = useState<File[]>([])
	const [title, setTitle] = useState("")
	const [detail, setDetail] = useState("")



	return (

		<URLModal>

			<h1 className="text-2xl font-bold">新しいスポット</h1>

			<div className="mt-4 flex gap-4">

				<div>

					<ImageFileGrid images={images} />

					<PickImagesButton onPick={(images) => setImages(images)} small={images.length !== 0} />
				</div>

				<div className="flex flex-col">
					
					<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" className="mt-0 w-60 pb-1   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500    placeholder:text-gray-400"/>
				
					<DynamicTextarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="コメント" className="mt-6 w-60 pb-1   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400"/>
				</div>

			</div>





		</URLModal>
	)
}

export default AddScreen