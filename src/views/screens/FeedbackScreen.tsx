import Screen from "../components/others/Screen"
import SettingSideBar from "../components/sections/SettingSideBar"

function FeedbackScreen() {

	return (
		<Screen title="フィードバック - Skyblue">


			<div className="flex flex-col gap-8 sm:flex-row sm:gap-8 md:gap-16 lg:gap-32">

				<SettingSideBar />

				<div className="grow">
					<h1 className="text-2xl font-bold">フィードバック</h1>
				</div>
			</div>
		</Screen>
	)
}

export default FeedbackScreen