import { NavLink } from "react-router-dom"
import AuthService from "../../utils/AuthService"
import Screen from "../components/others/Screen"

function AccountScreen() {

	return (

		<Screen title="設定 - Skyblue">


			<div className="flex gap-32">

				<div className="flex flex-col gap-4 items-start">

					<h1 className="text-2xl font-bold">設定</h1>

					<NavLink to="/settings/account" className="my-[-0.5rem] mx-[-1.5rem]   py-2 px-6 rounded-full whitespace-nowrap   hover:bg-gray-100 transition">アカウント</NavLink>
					<NavLink to="" className="my-[-0.5rem] mx-[-1.5rem]   py-2 px-6 rounded-full whitespace-nowrap   hover:bg-gray-100 transition">インターフェース</NavLink>
					<NavLink to="" className="my-[-0.5rem] mx-[-1.5rem]   py-2 px-6 rounded-full whitespace-nowrap   hover:bg-gray-100 transition">お問い合わせ</NavLink>
				</div>

				<div className="grow">
					<p className="text-2xl font-bold">アカウント</p>



					<p className="mt-8 text-lg font-bold">メールアドレス</p>
					<p className="text-gray-500">{AuthService.email() ?? "---"}</p>

					<div className="mt-8   flex justify-between items-center gap-8">
						<div>
							<p className="text-lg font-bold">メールアドレスを変更</p>
							<p className="text-gray-500">アカウントに登録されているメールアドレスを変更します。変更後は古いメールアドレスではログインできなくなります。Googleアカウントでログインしている場合は利用できません。</p>
						</div>

						<button className="py-2 px-6 border rounded-full   whitespace-nowrap   hover:bg-gray-100 transition">変更する</button>
					</div>

					<div className="mt-8   flex justify-between items-center gap-8">
						<div>
							<p className="text-lg font-bold">パスワードを変更</p>
							<p className="text-gray-500">アカウントに登録されているパスワードを変更します。変更後は古いパスワードではログインできなくなります。Googleアカウントでログインしている場合は利用できません。</p>
						</div>

						<button className="py-2 px-6 border rounded-full   whitespace-nowrap   hover:bg-gray-100 transition">変更する</button>
					</div>

					<div className="mt-8   flex justify-between items-center gap-8">
						<div>
							<p className="text-lg font-bold">アカウントを削除</p>
							<p className="text-gray-500">アカウントを削除します。あなたの投稿は自動的にすべて削除されます。</p>
						</div>

						<button className="py-2 px-6 border border-red-200 text-red-500 rounded-full   whitespace-nowrap   hover:bg-red-50 transition">削除する</button>
					</div>
				</div>
			</div>
		</Screen>
	)
}

export default AccountScreen