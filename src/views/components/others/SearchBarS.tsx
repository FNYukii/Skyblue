import { AiOutlineSearch } from "react-icons/ai";



interface Props {
	className?: string
}



function SearchBarS(props: Props) {


	return (

		<div className={props.className}>

			<div className="flex items-center">
				<button className="-m-3 p-3   rounded-full     hover:bg-gray-100 transition">
					<AiOutlineSearch className="text-2xl text-gray-400" />
				</button>
			</div>
		</div>
	)
}

export default SearchBarS