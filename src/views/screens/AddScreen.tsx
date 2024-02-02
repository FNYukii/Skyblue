import { useState } from "react"
import URLModal from "../components/URLModal"
import PickImagesButton from "../components/PickImagesButton"
import ImageFileGrid from "../components/ImageFileGrid"

function AddScreen() {

	const [images, setImages] = useState<File[]>([])
	const [title, setTitle] = useState("")
	const [detail, setDetail] = useState("")



	return (

		<URLModal>

			<h1 className="text-2xl font-bold">新しいスポット</h1>

			<div className="mt-4 flex gap-4">

				<div>

					<ImageFileGrid images={images}/>

					<PickImagesButton onPick={(images) => setImages(images)} small={images.length !== 0} />
				</div>

				<div>
					<p>hello</p>
				</div>

			</div>





		</URLModal>
	)
}

export default AddScreen