import { useEffect, useState } from "react"
import UserService from "../../../utils/UserService"
import User from "../../../entities/User"

interface Props {
	userId: string
	className?: string
}

function UserIcon(props: Props) {

	const [user, setUser] = useState<User | null>(null)
	const [isLoaded, setIsLoaded] = useState(false)



	useEffect(() => {
		(async () => {

			const user = await UserService.readUser(props.userId, true)
			setUser(user)
			setIsLoaded(true)
		})()

		// eslint-disable-next-line
	}, [])



	return (

		<div className={props.className}>

			<div className="w-full aspect-square rounded-full    overflow-hidden">

				{!isLoaded &&
					<div className="w-full h-full   bg-gray-700"></div>
				}

				{isLoaded && user === null &&
					<div className="w-full h-full   bg-gray-700"></div>
				}

				{isLoaded && user !== null &&
					<img src={user.iconUrl} alt="User icon" className="w-full h-full   bg-gray/50" />
				}
			</div>
		</div>
	)
}

export default UserIcon