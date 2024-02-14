import { useState } from "react"
import FormModal from "../components/others/FormModal"
import DynamicTextarea from "../components/others/DynamicTextarea"
import PickImagesButton from "../components/buttons/PickImageButton"
import PostService from "../../utils/PostService"
import { useNavigate } from "react-router-dom"
import StorageService from "../../utils/StorageService"
import PickLocationButton from "../components/buttons/PickLocationButton"
import Screen from "../components/others/Screen"
import DoneButton from "../components/buttons/DoneButton"



function CreatePostScreen() {

	const [imageFiles, setImageFiles] = useState<File[]>([])
	const [location, setLocation] = useState<{ lat: number, lng: number } | null>(null)

	const [name, setName] = useState("")
	const [detail, setDetail] = useState("")

	const [isLoading, setIsLoading] = useState(false)

	const navigate = useNavigate()



	async function create() {

		setIsLoading(true)

		// 値チェック
		if (location === null) return

		// 画像をアップロード
		const images = await StorageService.uploadImages(imageFiles, "/images")

		// 失敗した場合
		if (!images) {
			alert("画像のアップロードに失敗しました。")
			setIsLoading(false)
			return
		}

		// postを投稿
		const result = await PostService.createPost(images, location, name, detail)

		// 失敗した場合
		if (!result) {
			alert("投稿に失敗しました。")
			setIsLoading(false)
			return
		}

		// 成功した場合
		navigate(-1)
	}



	return (

		<Screen title="新しい投稿 - Skyblue">

			<FormModal className="w-full sm:w-[500px] md:w-[700px]">

				<h1 className="text-2xl font-bold">新しい投稿</h1>

				<div className="mt-4   grid grid-cols-1 sm:grid-cols-2   gap-x-8 gap-y-4">

					<div>
						<PickImagesButton onPick={files => setImageFiles(files)} files={imageFiles} />
					</div>

					<div>
						<PickLocationButton location={location} onPick={location => setLocation(location)} />

						<input value={name} onChange={e => setName(e.target.value)} placeholder="建物名" className="block   mt-6 w-full pb-2   border-b border-gray-300   outline-none focus:border-blue-500   placeholder:text-gray-400" />
						<DynamicTextarea value={detail} onChange={e => setDetail(e.target.value)} placeholder="詳細・感想" className="block   mt-6 w-full pb-2   border-b border-gray-300   outline-none focus:border-blue-500   placeholder:text-gray-400" />
					</div>
				</div>



				<div className="mt-4   flex justify-end">

					<DoneButton
						onClick={create}
						loading={isLoading}
						disabled={imageFiles.length === 0 || location === null || name === "" || name.length > 50 || detail.length > 100}
						label="投稿する"
					/>
				</div>
			</FormModal>
		</Screen>
	)
}

export default CreatePostScreen