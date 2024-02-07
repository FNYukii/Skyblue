import { useRef } from "react"



interface Props {
	iconUrl: string
	file?: File
	onPick: (file: File) => void

	className?: string
}



function PickIconButton(props: Props) {

	const inputRef = useRef<HTMLInputElement>(null)



	const onFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

		if (!e.target.files) return

		// 選択されたファイルを取得
		const fileList = e.target.files
		const files: File[] = Array.from(fileList)

		// 何も選択されていなかったら終了
		if (files.length === 0) return

		props.onPick(files[0])
	}



	return (

		<div className={props.className}>

			<div className="flex">

				<button type="button" onClick={() => inputRef.current?.click()} className="rounded-xl   hover:brightness-90 transition">

					{!props.file &&
						<img src={props.iconUrl} alt="User icon" className="w-32 aspect-square rounded-full   object-cover   bg-gray/50" />
					}

					{props.file &&
						<img src={window.URL.createObjectURL(props.file)} alt="User icon" className="w-32 aspect-square rounded-full   object-cover   bg-gray/50" />
					}
				</button>
			</div>



			<input hidden ref={inputRef} type="file" accept=".jpg,.png,.gif" onChange={onFileInputChange} />
		</div>
	)
}

export default PickIconButton