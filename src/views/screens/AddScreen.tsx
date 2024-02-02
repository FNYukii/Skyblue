import { useState } from "react"
import URLModal from "../components/URLModal"
import PickImagesButton from "../components/PickImagesButton"

function AddScreen() {

	const [images, setImages] = useState<File[]>([])
	const [title, setTitle] = useState("")
	const [detail, setDetail] = useState("")



	return (

		<URLModal>

			<h1 className="text-2xl font-bold">新しいスポット</h1>

			<PickImagesButton onPick={(images) => setImages(images)} className="mt-4" />

			<div className="mt-4   grid grid-cols-2 gap-2">

				{images.map((photo) => (
					<img src={window.URL.createObjectURL(photo)} alt="Images for new Spot" className="h-32 aspect-square rounded-xl" />
				))}
			</div>
		</URLModal>
	)
}

export default AddScreen