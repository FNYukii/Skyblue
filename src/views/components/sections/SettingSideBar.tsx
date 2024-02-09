import { NavLink } from 'react-router-dom'

function SettingSideBar() {

	return (

		<div className="flex flex-col gap-4 items-start">

			<h1 className="text-2xl font-bold">設定</h1>

			<NavLink to="/settings/account" className="-my-2 -mx-6   py-2 px-6 rounded-full whitespace-nowrap   hover:bg-gray-100 transition">アカウント</NavLink>
			<NavLink to="/settings/feedback" className="-my-2 -mx-6   py-2 px-6 rounded-full whitespace-nowrap   hover:bg-gray-100 transition">フィードバック</NavLink>
			<NavLink to="/settings/about" className="-my-2 -mx-6   py-2 px-6 rounded-full whitespace-nowrap   hover:bg-gray-100 transition">このアプリについて</NavLink>
		</div>
	)
}

export default SettingSideBar