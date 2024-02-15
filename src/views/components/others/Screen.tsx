import { ReactNode } from "react"

interface Props {
	title: string
	children?: ReactNode
}



function Screen(props: Props) {

	document.title = props.title

	return (
		<div className="mx-auto   w-full xl:w-[1280px]   px-4 xl:px-0   pt-2">
			{props.children}
		</div>
	)
}

export default Screen