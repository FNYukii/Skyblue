import { NavLink } from 'react-router-dom'
import { AiOutlineUser } from "react-icons/ai"
import { AiOutlineMessage } from "react-icons/ai";
import { AiOutlineInfoCircle } from "react-icons/ai"



function SettingSideBar() {

	return (

		<div>

			<h1 className="text-2xl font-bold">設定</h1>

			<div className='mt-4   flex flex-col gap-4 items-start'>

				<NavLink to="/settings/account" className="-my-2 -mx-6   py-2 px-6 rounded-full   flex items-center gap-3   hover:bg-gray-100 transition">
					<AiOutlineUser className='text-xl' />
					<p className='whitespace-nowrap'>アカウント</p>
				</NavLink>

				<NavLink to="/settings/feedback" className="-my-2 -mx-6   py-2 px-6 rounded-full   flex items-center gap-3   hover:bg-gray-100 transition">
					<AiOutlineMessage className='text-xl' />
					<p className='whitespace-nowrap'>フィードバック</p>
				</NavLink>

				<NavLink to="/settings/about" className="-my-2 -mx-6   py-2 px-6 rounded-full   flex items-center gap-3   hover:bg-gray-100 transition">
					<AiOutlineInfoCircle className='text-xl' />
					<p className='whitespace-nowrap'>このアプリについて</p>
				</NavLink>
			</div>
		</div>
	)
}

export default SettingSideBar