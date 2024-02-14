import { useEffect, useState } from "react"
import Screen from "../components/others/Screen"
import Post from "../../entities/Post"
import PostService from "../../utils/PostService"
import PostList from "../components/others/PostList"



function SearchScreen() {

	const searchParams = new URLSearchParams(window.location.search)
	const keyword = searchParams.get("keyword")



	return (

		<Screen title={`${keyword ?? "検索"} - Skyblue`}>

			{!keyword &&
				<p className="mt-16   text-center text-gray-500">キーワードが設定されていません</p>
			}

			{keyword &&
				<>
					<h1 className="text-2xl font-bold">「{keyword}」の検索結果</h1>

					<SearchPostList keyword={keyword} className="mt-2"/>
				</>
			}
		</Screen>
	)
}

export default SearchScreen



function SearchPostList(props: { keyword: string, className?: string }) {

	const [posts, setPosts] = useState<Post[] | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {
		(async () => {

			setIsLoaded(false)

			// nameで検索
			const postsByName = await PostService.readPostsByName(props.keyword)

			if (!postsByName) {
				setIsLoaded(true)
				return
			}

			// detailで検索
			const postsByDetail = await PostService.readPostsByDetail(props.keyword)

			if (!postsByDetail) {
				setIsLoaded(false)
				return
			}

			// 配列同士を結合
			let posts = postsByName.concat(postsByDetail)

			// 重複する要素を排除
			posts = posts.filter((post, index, posts) => posts.findIndex((e) => e.id === post.id) === index)

			setPosts(posts)
			setIsLoaded(true)

		})()
	}, [props.keyword])



	return (
		<PostList isLoaded={isLoaded} posts={posts} className={props.className} />
	)
}