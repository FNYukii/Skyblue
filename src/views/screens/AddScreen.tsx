import { useState } from "react"
import URLModal from "../components/URLModal"
import ImageFileGrid from "../components/ImageFileGrid"
import DynamicTextarea from "../components/DynamicTextarea"
import PickImagesButtonL from "../components/PickImageButtonL"
import PickImagesButtonS from "../components/PickImagesButtonS"

function AddScreen() {

	const [images, setImages] = useState<File[]>([])
	const [title, setTitle] = useState("")
	const [detail, setDetail] = useState("")



	return (

		<URLModal>

			<h1 className="text-2xl font-bold">新しいスポット</h1>

			<div>
				{images.length === 0 &&
					<PickImagesButtonL onPick={(images) => setImages(images)} className="mt-4" />
				}

				{images.length !== 0 &&

					<div>
						<ImageFileGrid images={images} className={`${images.length !== 0 && "mt-4"}`} />
						<PickImagesButtonS onPick={(images) => setImages(images)} className="mt-3"/>
					</div>
				}
			</div>

			<input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="タイトル" className="block   mt-3 w-full pb-1   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500    placeholder:text-gray-400" />

			<DynamicTextarea value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="コメント" className="block   mt-4 w-full pb-1   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />



		</URLModal>
	)
}

export default AddScreen