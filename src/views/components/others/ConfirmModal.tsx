import { MdOutlineClose } from "react-icons/md"

interface Props {
	title: string
	message?: string
	acceptLabel: string
	destructive?: boolean
	onClose: () => void
	onAccept: () => void
}

function ConfirmModal(props: Props) {

	return (

		<div className="z-10   fixed top-0 left-0   w-full h-full   flex justify-center items-center">

			<div onClick={props.onClose} className="w-full h-full   bg-black/30" />

			<div className="absolute   sm:min-w-[400px]   max-w-[95%] max-h[95%]   overflow-y-auto  p-8 bg-white rounded-xl">

				<button onClick={props.onClose} className="m-[-1rem]   p-4 rounded-full   hover:bg-gray-100 transition">
					<MdOutlineClose className="text-2xl text-gray-500" />
				</button>

				<p className="mt-4   text-xl font-bold">{props.title}</p>

				{props.message &&
					<p className="mt-2   text-gray-500 ">{props.message}</p>
				}

				<div className="mt-5   flex justify-between">

					<button type="button" onClick={props.onClose} className="my-[-0.25rem] mx-[-1rem]   py-1 px-4 font-bold rounded-full   hover:bg-gray-100 transition">キャンセル</button>
					<button type="button" onClick={props.onAccept} className={`my-[-0.25rem] mx-[-1rem]   py-1 px-4 font-bold rounded-full   hover:bg-gray-100 transition ${props.destructive && "text-red-500 hover:bg-red-100"}`}>{props.acceptLabel}</button>
				</div>
			</div>
		</div>
	)
}

export default ConfirmModal