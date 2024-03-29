import { useRef } from "react"
import { BiImageAdd } from "react-icons/bi"
import ImageFileGrid from "../others/ImageFileGrid"



interface Props {
	files: File[]
	onPick: (files: File[]) => void

	autoFocus?: boolean
	className?: string
}



function PickImagesButton(props: Props) {

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

			<div className="flex">

				<button type="button" autoFocus={props.autoFocus} onClick={() => inputRef.current?.click()} className="w-full rounded-xl">

					{props.files.length === 0 &&

						<div className="w-full aspect-square   rounded-xl border border-gray-300   flex justify-center items-center   hover:bg-gray-100 transition">
							<BiImageAdd className="text-4xl text-gray-400" />
						</div>
					}

					{props.files.length !== 0 &&

						<div className="w-full aspect-square   rounded-xl   hover:brightness-90 transition">
							<ImageFileGrid images={props.files} />
						</div>
					}
				</button>
			</div>



			<input hidden ref={inputRef} type="file" multiple accept=".jpg,.png,.gif" onChange={onFileInputChange} />
		</div>
	)
}

export default PickImagesButton