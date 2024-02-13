import { useState } from "react"
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"



interface Props {
	value: string
	onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
	placeholder?: string
	className?: string
	inputClassName?: string
}



function PasswordInput(props: Props) {

	const [isPasswordVisible, setIsPasswordVisible] = useState(false)

	return (

		<div className={props.className}>

			<div className="relative">

				<input
					type={isPasswordVisible ? "text" : "password"}
					value={props.value}
					onChange={(e) => props.onChange(e)}
					placeholder={props.placeholder}
					className={props.inputClassName}
				/>

				<button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)} className="absolute bottom-0 right-0   p-2 rounded-full   hover:bg-gray-100 transition">
					{!isPasswordVisible &&
						<AiOutlineEyeInvisible className="text-xl text-gray-400" />
					}

					{isPasswordVisible &&
						<AiOutlineEye className="text-xl text-gray-400" />
					}
				</button>
			</div>
		</div>
	)
}

export default PasswordInput