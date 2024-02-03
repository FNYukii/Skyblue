import { Link, useLocation } from "react-router-dom"

interface Props {
	to: string
	children: JSX.Element | JSX.Element[] | string

	className?: string
}

function NavLinkToModal(props: Props) {

	const location = useLocation()

	return (
		<Link to={props.to} state={{ previousPath: location.pathname }} className={props.className}>
			{props.children}
		</Link>
	)
}

export default NavLinkToModal