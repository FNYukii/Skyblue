import { createFocusTrap } from "focus-trap"
import { RefObject, useEffect } from "react"



interface Props {
	target: RefObject<HTMLDivElement>
}



function FocusTrapper(props: Props) {

	useEffect(() => {

		// ref.currentが無ければ終了
		if (props.target === undefined) return
		if (props.target.current === null) return
		
		// FocusTrapオブジェクトを作成して実行
		const focusTrap = createFocusTrap(props.target.current)
		focusTrap.activate()
		console.log("FocusTrap activated.")

		// FocusTrap停止
		return () => {
			focusTrap.deactivate()
		}

	}, [props.target])



	return null
}

export default FocusTrapper