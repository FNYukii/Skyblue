import Screen from "../components/others/Screen"
import RecentlyPostList from "../components/sections/RecentlyPostList"



function SearchScreen() {

	const searchParams = new URLSearchParams(window.location.search)
	const keyword = searchParams.get("keyword")



	return (

		<Screen title="検索 - Skyblue">

			{!keyword &&
				<p className="mt-16   text-center text-gray-500">キーワードが設定されていません</p>
			}

			{keyword &&
				<>
					<h1 className="text-2xl font-bold">「{keyword}」の検索結果</h1>

					<RecentlyPostList className="mt-2"/>
				</>
			}
		</Screen>
	)
}

export default SearchScreen