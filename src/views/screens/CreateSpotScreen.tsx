import { useState } from "react"
import URLModal from "../components/parts/URLModal"
import DynamicTextarea from "../components/parts/DynamicTextarea"
import PickImagesButton from "../components/parts/PickImageButton"
import SpotService from "../../utils/SpotService"
import { useNavigate } from "react-router-dom"
import StorageService from "../../utils/StorageService"
import LoadingIcon from "../components/parts/LoadingIcon"
import PickLocationButton from "../components/parts/PickLocationButton"



function CreateSpotScreen() {

	document.title = "新しいスポット - Skyblue"



	const [images, setImages] = useState<File[]>([])
	const [location, setLocation] = useState<number[] | null>(null)

	const [name, setName] = useState("")
	const [detail, setDetail] = useState("")

	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()



	async function create() {

		setIsLoading(true)

		// 値チェック
		if (location === null) return

		// 画像をアップロード
		const imageUrls = await StorageService.uploadImages(images, "/images")

		// 失敗した場合
		if (!imageUrls) {
			alert("画像のアップロードに失敗しました。")
			setIsLoading(false)
			return
		}

		// Spotを投稿
		const spotId = await SpotService.createSpot(imageUrls, location, name, detail)

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

			<div className="mt-4   grid grid-cols-1 sm:grid-cols-2   gap-x-8 gap-y-4">

				<div>
					<PickImagesButton onPick={images => setImages(images)} images={images} />
				</div>

				<div>
					<PickLocationButton location={location} onPick={location => setLocation(location)} />

					<input value={name} onChange={e => setName(e.target.value)} placeholder="スポット名" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />
					<DynamicTextarea value={detail} onChange={e => setDetail(e.target.value)} placeholder="詳細・感想" className="block   mt-6 w-full pb-2   bg-transparent border-b border-gray-300   focus:outline-none focus:border-blue-500   placeholder:text-gray-400" />
				</div>
			</div>


			<div className="mt-4   flex justify-end">

				{!isLoading &&

					<button
						className="px-6 py-1   bg-black text-white font-bold rounded-full   disabled:bg-gray-400   enabled:hover:bg-gray-600 transition"
						disabled={images.length === 0 || location === null || name === "" || name.length > 50 || detail.length > 100}
						onClick={create}
					>
						投稿
					</button>
				}

				{isLoading &&
					<LoadingIcon className="mt-5" color="#000" />
				}
			</div>
		</URLModal>
	)
}

export default CreateSpotScreen