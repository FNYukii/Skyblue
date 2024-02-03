import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import User from "../../entities/User"
import UserService from "../../utils/UserService"
import LoadingIcon from "../components/others/LoadingIcon"
function UserScreen() {

	document.title = "ユーザー - Skyline"

	const { userId } = useParams()



	const [user, setUser] = useState<User | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {

		(async () => {

			const user = await UserService.readUser(userId ?? "")
			setUser(user)
			setIsLoaded(true)
		})()

		// eslint-disable-next-line
	}, [])



	return (

		<div className="h-full">

				{!isLoaded &&
					<div className="h-[40%] flex flex-col justify-end">
						<LoadingIcon center className="mt-16" />
					</div>
				}

				{isLoaded && user === null &&
					<p className="mt-16   text-center text-gray-500">読み取りに失敗しました</p>
				}

				{isLoaded && user !== null &&

					<div className="h-full">

						<p>{user.displayName} のプロフィール</p>
					</div>
				}
			</div>
	)
}

export default UserScreen