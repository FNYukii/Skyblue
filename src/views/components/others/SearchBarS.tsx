import { useEffect, useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



interface Props {
	className?: string
}



function SearchBarS(props: Props) {

	const [isOpen, setIsOpen] = useState(false)
	const [keyword, setKeyword] = useState("")

	const navigate = useNavigate()



	useEffect(() => {
		setKeyword("")
	}, [isOpen])



	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		search()
	}

	function search() {

		// keywordが空もしくは空白だけなら、検索しない
		if (keyword === "" || !keyword.match(/\S/g)) {
			return
		}

		setIsOpen(false)
		navigate(`/search?keyword=${keyword}`)
	}




	return (

		<div className={props.className}>

			{!isOpen &&
				<div className="flex items-center">

					<button onClick={() => setIsOpen(true)} className="-m-3 p-3   rounded-full     hover:bg-gray-100 transition">
						<AiOutlineSearch className="text-2xl" />
					</button>
				</div>
			}

			{isOpen &&
				<div className="z-10 fixed top-0 left-0 w-screen h-screen">

					<div onClick={() => setIsOpen(false)} className="w-full h-full   bg-black/50" />

					<div className="fixed top-0 left-0 w-full h-16   bg-white   flex items-center gap-4   px-4">

						<button onClick={() => setIsOpen(false)} className="-m-3 p-3   rounded-full     hover:bg-gray-100 transition">
							<AiOutlineArrowLeft className="text-2xl text-gray-400" />
						</button>

						<form onSubmit={e => onSubmit(e)} className="w-full">
							<input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="検索" autoFocus inputMode="search" className="w-full  py-2 px-4 border rounded-full   placeholder:text-gray-400" />
						</form>
					</div>

				</div>
			}
		</div>
	)
}

export default SearchBarS