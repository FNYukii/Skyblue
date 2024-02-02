import { useEffect, useRef } from "react"

interface Props {
	value: string
	onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
	placeholder?: string

	className?: string 
}

function DynamicTextarea(props: Props) {

	const textAreaRef = useResizeTextArea(props.value)

	return (

		<textarea
			value={props.value}
			onChange={(e) => props.onChange(e)}
			ref={textAreaRef}
			placeholder={props.placeholder ?? ""}
			className={`resize-none ${props.className}`}
		/>
	)
}



function useResizeTextArea(value: string) {

	const ref = useRef<HTMLTextAreaElement>(null)

	useEffect(() => {

		const element = ref.current
		if (!element) {
			return
		}

		element.style.height = "1rem"
		element.style.height = `calc(${element.scrollHeight}px + 2px)`
	}, [value])

	return ref
}

export default DynamicTextarea