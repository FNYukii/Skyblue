import { useRef } from "react"
import { AiOutlinePlus } from "react-icons/ai"



interface Props {
	onPick: (images: File[]) => void

	className?: string
}



function PickImagesButtonS(props: Props) {

	const inputRef = useRef<HTMLInputElement>(null)



	const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		if (!e.target.files) return

		// 選択されたファイルを取得
		const fileList = e.target.files
		const files: File[] = Array.from(fileList)

		// 何も選択されていなかったら終了
		if (files.length === 0) return

		// 5番目以降の要素は配列から削除
		files.splice(4)

		props.onPick(files)
	}



	return (

		<div className={props.className}>

			<button type="button" onClick={() => inputRef.current?.click()} className="ml-[-0.5rem] mt-2   flex items-center gap-2   px-2 py-1 text-gray-500 rounded-full   hover:bg-gray-100 transition">

				<AiOutlinePlus />
				<p>画像を追加</p>
			</button>

			<input hidden ref={inputRef} type="file" multiple accept=".jpg,.png,.gif" onChange={onFileInputChange} />
		</div>
	)
}

export default PickImagesButtonS