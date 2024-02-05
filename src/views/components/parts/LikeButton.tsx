import { Unsubscribe } from "firebase/firestore"
import { useState, useEffect } from "react"
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai"
import Spot from "../../../entities/Spot"
import SpotService from "../../../utils/SpotService"
import LoadingIcon from "./LoadingIcon"
import { AiOutlineExclamationCircle } from "react-icons/ai"
import { onAuthStateChanged } from "firebase/auth"
import { auth } from "../../../utils/firebase"
import UserService from "../../../utils/UserService"



interface Props {
	spotId: string
	showLikeCount?: boolean

	className?: string
}



function LikeButton(props: Props) {

	// 該当のSpot
	const [userIds, setUserIds] = useState<string[] | null>(null)
	const [isLoadedUserIds, setIsLoadedUserIds] = useState(false)

	// Spotを監視して最新のSpotを取得
	useEffect(() => {

		let unsubscribe: Unsubscribe

		(async () => {

			unsubscribe = await UserService.onUserIdsLikeSpotChanged(props.spotId, userIds => {

				setUserIds(userIds)
				setIsLoadedUserIds(true)

			}, (error) => {
				setIsLoadedUserIds(true)
			})
		})()

		return () => {
			if (unsubscribe) unsubscribe()
		}
		// eslint-disable-next-line
	}, [])




	// ログイン中のUID
	const [uid, setUid] = useState<string | null>(null)
	const [isLoadedUid, setIsLoadedUid] = useState(false)

	// ログイン状態を監視して最新のユーザーIDを取得
	useEffect(() => {

		onAuthStateChanged(auth, (user) => {

			setUid(user?.uid ?? null)
			setIsLoadedUid(true)
		})
	}, [])



	return (

		<div className={props.className}>

			{!isLoadedUserIds &&
				<LoadingIcon />
			}

			{isLoadedUserIds && userIds === null &&
				<AiOutlineExclamationCircle className="text-gray-400 text-xl" />
			}

			{isLoadedUserIds && userIds !== null &&

				<div>

					{!isLoadedUid &&
						<LoadingIcon />
					}

					{isLoadedUid && uid === null &&

						<div className="m-[-0.5rem]   p-2 rounded-full   flex items-center gap-1">
							<AiOutlineHeart className="text-white text-xl" />
							{props.showLikeCount &&
								<p className="text-white">{userIds.length}</p>
							}
						</div>
					}

					{isLoadedUid && uid !== null && !userIds.includes(uid) &&

						<button className="m-[-0.5rem]   p-2 rounded-full   flex items-center gap-1   hover:bg-white/20 transition">
							<AiOutlineHeart className="text-white text-xl" />
							{props.showLikeCount &&
								<p className="text-white">{userIds.length}</p>
							}
						</button>
					}

					{isLoadedUid && uid !== null && userIds.includes(uid) &&

						<button className="m-[-0.5rem]   p-2 rounded-full   flex items-center gap-1   hover:bg-white/20 transition">
							<AiFillHeart className="text-white text-xl" />
							{props.showLikeCount &&
								<p className="text-white">{userIds.length}</p>
							}
						</button>
					}
				</div>
			}
		</div>
	)
}

export default LikeButton