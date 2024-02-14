import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { useNavigate } from "react-router-dom";



interface Props {
	className?: string
}



function SearchBar(props: Props) {

	const [keyword, setKeyword] = useState("")
	const navigate = useNavigate()



	function onSubmit(e: React.FormEvent<HTMLFormElement>) {
		e.preventDefault()
		search()
	}



	function search() {

		// keywordが空もしくは空白だけなら、検索しない
		if (keyword === "" || !keyword.match(/\S/g)) {
			return
		}

		navigate(`/search?keyword=${keyword}`)
	}



	return (

		<div className={props.className}>

			<div className="flex">

				<form onSubmit={e => onSubmit(e)}>
					<input value={keyword} onChange={e => setKeyword(e.target.value)} placeholder="検索" className="w-[300px]   py-2 px-4 border rounded-l-full" />
				</form>

				<button onClick={search} className="flex items-center   border-y border-r py-2 pl-2 pr-3 rounded-r-full   placeholder:text-gray-400   hover:bg-gray-100 transition">
					<AiOutlineSearch className="text-2xl text-gray-400" />
				</button>
			</div>
		</div>
	)
}

export default SearchBar