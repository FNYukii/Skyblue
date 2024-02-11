import Screen from "../components/others/Screen"
import SettingSideBar from "../components/sections/SettingSideBar"

function AboutScreen() {

	return (

		<Screen title="このアプリについて - Skyblue">

			<div className="flex flex-col gap-8 sm:flex-row sm:gap-8 md:gap-16">

				<SettingSideBar />

				<div className="grow">

					<p className="text-2xl font-bold">このアプリについて</p>

					<p className="mt-8 text-lg font-bold">ソースコード</p>
					<p className="text-gray-500">このアプリのソースコードは <a target="blank" href="https://github.com/FNYukii/Skyblue" className="hover:underline">GitHub</a> で確認できます。</p>
					
					<p className="mt-8 text-lg font-bold">主な使用技術</p>
					<ul className="text-gray-500 list-disc list-inside ml-2">
						<li>React</li>
						<li>Tailwind CSS</li>
						<li>Firebase</li>
						<li>Google Map Platform</li>
					</ul>
					<p className="mt-2 text-gray-500">その他の使用ライブラリは <a target="blank" href="https://github.com/FNYukii/Skyblue" className="hover:underline">ソースコード</a> をご確認ください。</p>

				</div>
			</div>
		</Screen>
	)
}

export default AboutScreen