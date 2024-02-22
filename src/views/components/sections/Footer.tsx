import { NavLink } from "react-router-dom"

interface Props {
	className?: string
}

function Footer(props: Props) {

	return (

		<footer className={props.className}>

			<div className="bg-gray-800 text-white pt-8 pb-4">

				<div className="w-full xl:w-[1280px] px-4 xl:px-0 mx-auto">

					<div className="flex justify-between">

						<div>
							<NavLink to="/" className="text-3xl font-light">Skyblue</NavLink>
							<p className="mt-1 text-gray-400">ビルの写真が集まるサイト</p>
						</div>

						<div>
							<p className="font-bold text-xl">Pages</p>
							<div className="mt-2 flex flex-col">
								<NavLink to="/" className="text-gray-400 hover:underline">トップ</NavLink>
								<NavLink to="/maps" className="mt-1 text-gray-400 hover:underline">マップ</NavLink>
							</div>
						</div>
					</div>

					<p className="mt-16 text-gray-400 text-center">
						<span>© 2024 FNYukii.</span>
						<a target="blank" href="https://github.com/FNYukii/Skyblue" className="ml-2 text-gray-400 hover:underline">Source</a>
					</p>
				</div>
			</div>
		</footer>
	)
}

export default Footer