import Screen from "../components/others/Screen"
import SettingSideBar from "../components/sections/SettingSideBar"
import NavLinkToModal from "../components/others/NavLinkToModal"

function FeedbackScreen() {

	return (
		<Screen title="フィードバック - Skyblue">


			<div className="flex flex-col gap-8 sm:flex-row sm:gap-8 md:gap-16 lg:gap-32">

				<SettingSideBar />

				<div className="grow">
					<h1 className="text-2xl font-bold">フィードバック</h1>

					<div className="mt-8   flex justify-between items-center gap-2   flex-col sm:flex-row sm:gap-8">

						<p className="text-gray-500">アプリに関する意見を送信できます。アプリを利用していて感じた問題や機能改善に関する要望などをお寄せください。いただいたフィードバックへの返信は行っておりません。<br />送信したフィードバックにはユーザーIDが紐づけされます。</p>
						<NavLinkToModal to="/settings/feedback/new" className="py-2 px-6 border font-bold rounded-full   whitespace-nowrap   hover:bg-gray-100 transition">作成する</NavLinkToModal>
					</div>
				</div>
			</div>
		</Screen>
	)
}

export default FeedbackScreen