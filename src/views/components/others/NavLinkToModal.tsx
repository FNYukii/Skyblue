import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"

interface Props {
	to: string
	children: ReactNode

	onClick?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void
	className?: string
}

function NavLinkToModal(props: Props) {

	const location = useLocation()

	return (
		<Link to={props.to} state={{ previousPath: location.pathname }} onClick={props.onClick} className={props.className}>
			{props.children}
		</Link>
	)
}

export default NavLinkToModal