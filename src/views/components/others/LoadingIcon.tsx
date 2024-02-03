import ReactLoading from "react-loading"

interface Props {
	center?: boolean
	color?: string

	className?: string
}

function LoadingIcon(props: Props) {

	return (

		<div className={props.className}>

			<div className={`${props.center && "w-full flex justify-center"}`}>

				<ReactLoading
					type="spin"
					color={props.color ?? "#94A3B8"}
					height="20px"
					width="20px"
				/>
			</div>
		</div>
	)
}

export default LoadingIcon