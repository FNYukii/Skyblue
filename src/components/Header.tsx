import { NavLink } from "react-router-dom"

function Header() {

	return (

		<header className="mx-auto   w-full lg:w-[1024px]   px-4 lg:px-0   py-4   flex justify-between items-center">

			<NavLink to="/" className="text-3xl font-light">Skyblue</NavLink>
			<NavLink to="/account" className="hover:underline">Account</NavLink>
		</header>
	)
}

export default Header