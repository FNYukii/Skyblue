import { ReactNode } from "react"
import Header from "../sections/Header"
import Footer from "../sections/Footer"

interface Props {
	title: string
	children?: ReactNode
}



function Screen(props: Props) {

	document.title = props.title

	return (

		<div className="h-full">

			<Header />

			<main className="mx-auto   w-full xl:w-[1280px]   px-4 xl:px-0   pt-2">
				{props.children}
			</main>

			<Footer className="mt-16   sticky top-full" />
		</div>
	)
}

export default Screen