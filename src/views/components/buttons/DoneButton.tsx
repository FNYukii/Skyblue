import LoadingIcon from "../others/LoadingIcon"

interface Props {
	loading: boolean
	disabled: boolean
	label: string

	onClick: () => void

	className?: string
}

function DoneButton(props: Props) {

	return (

		<div className={props.className}>

			{!props.loading &&

				<button
					onClick={props.onClick}
					disabled={props.disabled}
					className="px-6 py-1   bg-black text-white font-bold rounded-full   disabled:bg-gray-400   enabled:hover:bg-gray-600 transition"
				>
					{props.label}
				</button>
			}

			{props.loading &&
				<LoadingIcon className="mt-2" color="#000" />
			}
		</div>
	)
}

export default DoneButton