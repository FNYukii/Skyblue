import Screen from "../components/others/Screen"
import SettingSideBar from "../components/sections/SettingSideBar"

function AboutScreen() {

	return (

		<Screen title="このアプリについて - Skyblue">

			<div className="flex flex-col gap-8 sm:flex-row sm:gap-8 md:gap-16 lg:gap-32">

				<SettingSideBar />

				<div className="grow">

					<p className="text-2xl font-bold">このアプリについて</p>

					<p className="mt-8 text-lg font-bold">ソースコード</p>
					<p className="text-gray-500">このアプリのソースコードは <a target="blank" href="https://github.com/FNYukii/Skyblue" className="hover:underline">GitHub</a> で確認できます。</p>
					
					<p className="mt-8 text-lg font-bold">システム概要</p>
					<p className="text-gray-500">Readme here.</p>

				</div>
			</div>
		</Screen>
	)
}

export default AboutScreen