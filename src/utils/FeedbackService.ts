import { db } from "./firebase"
import AuthService from "./AuthService"
import { addDoc, collection, serverTimestamp } from "firebase/firestore"



class FeedbackService {

	static async createFeedback(title: string, detail: string): Promise<string | null> {

		// 値チェック
		if (title === "" || title.length > 100) return null
		if (detail === "" || detail.length > 300) return null

		// UIDを取得
		const uid = await AuthService.uid()
		if (!uid) return null

		try {

			// 新しいFeedbackを追加
			const ref = await addDoc(collection(db, "feedbacks"), {

				createdAt: serverTimestamp(),
				userId: uid,

				title: title,
				detail: detail,
			})

			// 成功したらドキュメントIDをメソッド呼び出し元に返す
			return ref.id

		} catch (error) {

			console.log(`FAIL! Error to create feedback. ${error}`)
			return null
		}
	}
}

export default FeedbackService