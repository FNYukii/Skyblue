import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";



interface Props {
	className?: string
}



function SearchBarS(props: Props) {

	const [isOpen, setIsOpen] = useState(false)



	return (

		<div className={props.className}>

			{!isOpen &&
				<div className="flex items-center">

					<button onClick={() => setIsOpen(true)} className="-m-3 p-3   rounded-full     hover:bg-gray-100 transition">
						<AiOutlineSearch className="text-2xl text-gray-400" />
					</button>
				</div>
			}

			{isOpen &&
				<div className="z-10 fixed top-0 left-0 w-screen h-screen   bg-black/50">

					<div className="w-full h-16 bg-white   flex items-center px-4">

						<button onClick={() => setIsOpen(false)} className="-m-3 p-3   rounded-full     hover:bg-gray-100 transition">
							<AiOutlineArrowLeft className="text-2xl text-gray-400" />
						</button>
					</div>


				</div>
			}
		</div>
	)
}

export default SearchBarS