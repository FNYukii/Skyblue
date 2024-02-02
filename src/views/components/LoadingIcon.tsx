import ReactLoading from "react-loading"

interface Props {
	center?: boolean

	className?: string
}

function LoadingIcon(props: Props) {

	return (

		<div className={props.className}>

			<div className={`${props.center && "w-full flex justify-center"}`}>

				<ReactLoading
					type="spin"
					color="#94A3B8"
					height="20px"
					width="20px"
				/>
			</div>
		</div>
	)
}

export default LoadingIcon