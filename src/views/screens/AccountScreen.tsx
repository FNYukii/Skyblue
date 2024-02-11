import AuthService from "../../utils/AuthService"
import Screen from "../components/others/Screen"
import SettingSideBar from "../components/sections/SettingSideBar"

function AccountScreen() {

	return (

		<Screen title="アカウント - Skyblue">


			<div className="flex flex-col gap-8 sm:flex-row sm:gap-8 md:gap-16">

				<SettingSideBar />

				<div className="grow">
					<p className="text-2xl font-bold">アカウント</p>

					<p className="mt-8 text-lg font-bold">ユーザーID</p>
					<p className="text-gray-500">{AuthService.uidQuickly() ?? "---"}</p>

					<p className="mt-8 text-lg font-bold">メールアドレス</p>
					<p className="text-gray-500">{AuthService.email() ?? "---"}</p>

					<div className="mt-8   flex justify-between items-center gap-2   flex-col sm:flex-row sm:gap-8">
						<div>
							<p className="text-lg font-bold">メールアドレスを変更</p>
							<p className="text-gray-500">アカウントに登録されているメールアドレスを変更します。変更後は古いメールアドレスではサインインできなくなります。新しいメールアドレスと現在のパスワードの入力が必要です。</p>
						</div>

						<button onClick={() => alert("この機能は未実装です。")} className="py-2 px-6 border rounded-full   whitespace-nowrap   hover:bg-gray-100 transition">変更する</button>
					</div>

					<div className="mt-8   flex justify-between items-center gap-2   flex-col sm:flex-row sm:gap-8">
						<div>
							<p className="text-lg font-bold">パスワードを変更</p>
							<p className="text-gray-500">アカウントに登録されているパスワードを変更します。変更後は古いパスワードではサインインできなくなります。新しいパスワードと現在のパスワードの入力が必要です。</p>
						</div>

						<button onClick={() => alert("この機能は未実装です。")} className="py-2 px-6 border rounded-full   whitespace-nowrap   hover:bg-gray-100 transition">変更する</button>
					</div>

					<div className="mt-8   flex justify-between items-center gap-2   flex-col sm:flex-row sm:gap-8">
						<div className="w-full">
							<p className="text-lg font-bold">アカウントを削除</p>
							<p className="text-gray-500">アカウントを削除します。あなたのユーザーデータと投稿は自動的にすべて削除されます。</p>
						</div>

						<button onClick={() => alert("この機能は未実装です。")} className="py-2 px-6 border border-red-200 text-red-500 rounded-full   whitespace-nowrap   hover:bg-red-50 transition">削除する</button>
					</div>
				</div>
			</div>
		</Screen>
	)
}

export default AccountScreen