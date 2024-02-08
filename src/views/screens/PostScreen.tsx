import { useEffect, useRef, useState } from "react"
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom"
import Post from "../../entities/Post"
import PostService from "../../utils/PostService"
import LoadingIcon from "../components/others/LoadingIcon"
import UserIcon from "../components/others/UserIcon"
import { MdOutlineClose } from "react-icons/md"
import Escaper from "../components/others/Escaper"
import { AiOutlineArrowLeft } from "react-icons/ai"
import { AiOutlineArrowRight } from "react-icons/ai"
import LikeButton from "../components/buttons/LikeButton"
import Screen from "../components/others/Screen"
import AuthService from "../../utils/AuthService"
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu"
import { IoEllipsisHorizontal } from "react-icons/io5"
import ConfirmModal from "../components/others/ConfirmModal"

import '@szhsin/react-menu/dist/index.css'
import "@szhsin/react-menu/dist/theme-dark.css"



function PostScreen() {

	// Params
	const { postId } = useParams()
	const { imageNumber } = useParams()
	const imageIndex = Number(imageNumber ?? "1") - 1

	// 画面のタイトル
	const [pageTitle, setPageTitle] = useState<string | null>(null)

	// 画面遷移用Hooks
	const navigate = useNavigate()
	const location = useLocation()



	// Post
	const [post, setPost] = useState<Post | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)

	// Postを読み取る
	useEffect(() => {

		(async () => {

			// キャッシュから読み取る
			let post = await PostService.readPostFromCache(postId ?? "---")

			// 失敗したらサーバーからも読み取る
			if (!post) {
				post = await PostService.readPost(postId ?? "---")
			}

			setPageTitle(`${post?.name ?? "投稿"} - Skyblue`)
			setPost(post)
			setIsLoaded(true)
		})()

		// eslint-disable-next-line
	}, [])



	return (

		<Screen title={pageTitle ?? "投稿 - Skyblue"}>

			<Escaper />

			<div className="fixed   top-0 left-0 w-screen h-screen   flex justify-center items-center">

				<div
					onClick={() => {
						if (location.key === "default") navigate("/")
						if (location.key !== "default") navigate(-1)
					}}
					className="w-screen h-screen bg-black/90"
				/>

				<div className="absolute   h-[95vh] max-w-[95vw] max-h-[95vh]   pointer-events-none">

					{!isLoaded &&
						<LoadingIcon center large color="#fff" className="mt-[40vh]" />
					}

					{isLoaded && post === null &&
						<p className="mt-[40vh]   text-center text-gray-400">読み取りに失敗しました</p>
					}



					{isLoaded && post !== null && !(imageIndex >= 0 && imageIndex < post.images.length) &&
						<p className="mt-[40vh]   text-center text-gray-400">画像が見つかりませんでした</p>
					}

					{isLoaded && post !== null && imageIndex >= 0 && imageIndex < post.images.length &&
						<Display post={post} imageIndex={imageIndex} />
					}
				</div>



				<button
					onClick={() => {
						if (location.key === "default") navigate("/")
						if (location.key !== "default") navigate(-1)
					}}
					className="absolute top-0 left-0   m-2   p-4 rounded-full    hover:bg-white/20 transition"
				>
					<MdOutlineClose className="text-2xl text-white" />
				</button>
			</div>
		</Screen>
	)
}

export default PostScreen



function Display(props: { post: Post, imageIndex: number }) {

	const navigate = useNavigate()
	const location = useLocation()


	// 左右ボタンのRef
	const prevButtonRef = useRef<HTMLButtonElement>(null)
	const nextButtonRef = useRef<HTMLButtonElement>(null)

	// 削除モーダルの状態
	const [isShowDeleteModal, setIsShowDeleteModal] = useState(false)

	// 画像のインデックス
	const [imageIndex, setImageIndex] = useState(props.imageIndex)



	// 表示する画像を切り替える
	function prevImage() {

		const newImageIndex = imageIndex - 1
		setImageIndex(newImageIndex)
		navigate(`/posts/${props.post.id}/images/${newImageIndex + 1}`, { replace: true })
	}

	function nextImage() {

		const newImageIndex = imageIndex + 1
		setImageIndex(newImageIndex)
		navigate(`/posts/${props.post.id}/images/${newImageIndex + 1}`, { replace: true })
	}



	// 矢印キーが押されたら画像を切り替える
	function onKeyDown(event: KeyboardEvent) {
		if (event.keyCode === 37) prevButtonRef.current?.click()
		if (event.keyCode === 39) nextButtonRef.current?.click()
	}

	useEffect(() => {
		document.addEventListener("keydown", onKeyDown, false)

		return () => {
			document.removeEventListener("keydown", onKeyDown, false)
		}
		// eslint-disable-next-line
	}, [])



	return (

		<div className="h-full   flex flex-col gap-2">

			<div className="min-h-0 grow    w-fit mx-auto">

				<div className="h-full    max-w-screen   flex items-center gap-2">

					<button onClick={() => prevImage()} disabled={imageIndex === 0} ref={prevButtonRef} className="h-fit w-fit   p-3 rounded-full   text-white   disabled:opacity-0 enabled:pointer-events-auto   enabled:hover:bg-white/20 transition">
						<AiOutlineArrowLeft className="text-2xl" />
					</button>

					<img src={props.post.images[imageIndex].url} alt="Attached on Post" className="h-full   pointer-events-auto   min-w-0" />

					<button onClick={() => nextImage()} disabled={imageIndex === props.post.images.length - 1} ref={nextButtonRef} className="h-fit w-fit   p-3 rounded-full   text-white   disabled:opacity-0 enabled:pointer-events-auto   enabled:hover:bg-white/20 transition">
						<AiOutlineArrowRight className="text-2xl" />
					</button>
				</div>
			</div>



			<div className="mx-auto min-w-[95%] sm:min-w-[600px] sm:max-w-[800px]   flex justify-between items-start gap-4   pointer-events-auto">

				<div>
					<p className="text-white font-bold">{props.post.name}</p>

					{props.post.detail &&
						<p className="mt-1 text-gray-400">{props.post.detail}</p>
					}
				</div>

				<div className="flex items-center gap-4">

					<NavLink to={`/users/${props.post.userId}`} className="rounded-full   hover:brightness-90 transition">
						<UserIcon userId={props.post.userId} className="w-8 rounded-full" />
					</NavLink>

					<LikeButton postId={props.post.id} showLikeCount />



					{AuthService.uidQuickly() === props.post.userId &&
						<Menu
							menuButton={
								<MenuButton className="m-[-0.5rem] p-2   rounded-full   hover:bg-gray-500/50 transition">
									<IoEllipsisHorizontal className="text-xl text-white" />
								</MenuButton>
							}
							transition
							arrow
							position="anchor"
							theming="dark"
						>
							<MenuItem>
								<button onClick={() => setIsShowDeleteModal(true)} className="text-red-500">削除</button>
							</MenuItem>
						</Menu>
					}

					{isShowDeleteModal &&
						<ConfirmModal
							title="この投稿を削除してもよろしいですか?"
							acceptLabel="削除"
							destructive
							dark
							onClose={() => setIsShowDeleteModal(false)}
							onAccept={async () => {

								// Postを削除
								PostService.deletePost(props.post.id, props.post.images.map(image => image.path))

								// 成功したら前の画面に戻る
								if (location.key === "default") navigate("/")
								if (location.key !== "default") navigate(-1)
							}}
						/>
					}
				</div>
			</div>
		</div>
	)
}