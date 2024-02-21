import { createFocusTrap } from "focus-trap"
import { RefObject, useEffect } from "react"



interface Props {
	targetRef: RefObject<HTMLDivElement>
}



function FocusTrapper(props: Props) {

	useEffect(() => {

		// ref.currentが無ければ終了
		if (props.targetRef === undefined) return
		if (props.targetRef.current === null) return
		
		// FocusTrapオブジェクトを作成して実行
		const focusTrap = createFocusTrap(props.targetRef.current)
		focusTrap.activate()
		console.log("FocusTrap activated.")

		// FocusTrap停止
		return () => {
			focusTrap.deactivate()
		}

	}, [props.targetRef])



	return null
}

export default FocusTrapper