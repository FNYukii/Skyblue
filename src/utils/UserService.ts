import { DocumentSnapshot, QueryDocumentSnapshot, doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore"
import { db } from "./firebase"
import User from "../entities/User"

class UserService {



	static toUser(from: DocumentSnapshot | QueryDocumentSnapshot): User {

		const doc: DocumentSnapshot = from

		// ドキュメントの各フィールドの値を取り出す
		const id: string = doc.id
		const createdAt: Date = doc.get("createdAt").toDate()
		const displayName: string = doc.get("displayName")
		const iconUrl: string = doc.get("iconUrl")

		// 値を使ってUserオブジェクトを作成
		const user: User = {
			id: id,
			createdAt: createdAt,
			displayName: displayName,
			iconUrl: iconUrl,
		}

		return user
	}



	static async readUser(userId: string): Promise<User | null> {

		// 参照を取得
		const docRef = doc(db, "users", userId)

		try {

			// データ読み取り
			const doc = await getDoc(docRef)

			// ドキュメントが無ければ失敗と扱う
			if (!doc.exists()) {
				console.log(`FAIL! User "${userId}" is not exist.`)
				return null
			}
			console.log(`SUCCESS! Read 1 User.`)

			const user = this.toUser(doc)
			return user

		} catch (error) {

			console.log(`FAIL! Error reading user. ${error}`)
			return null
		}
	}



	static async createUser(userId: string): Promise<string | null> {

		try {

			// 新しいUserを作成
			await setDoc(doc(db, "users", userId), {
				createdAt: serverTimestamp(),
				displayName: "名無しさん",
				iconUrl: ""
			})
			console.log(`SUCCESS! Created 1 User.`)

			// 成功したらドキュメントIDをメソッド呼び出し元に返す
			return userId

		} catch (error) {

			console.log(`FAIL! Error to User creation. ${error}`)
			return null
		}
	}
}

export default UserService