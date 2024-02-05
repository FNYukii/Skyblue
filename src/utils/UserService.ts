import { DocumentSnapshot, QueryDocumentSnapshot, Unsubscribe, arrayRemove, arrayUnion, collection, doc, getDoc, getDocFromCache, limit, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "./firebase"
import User from "../entities/User"
import AuthService from "./AuthService"



class UserService {



	static toUser(from: DocumentSnapshot | QueryDocumentSnapshot): User {

		const doc: DocumentSnapshot = from

		// ドキュメントの各フィールドの値を取り出す
		const id: string = doc.id
		const createdAt: Date = doc.get("createdAt")?.toDate() ?? undefined
		const displayName: string = doc.get("displayName")
		const iconUrl: string = doc.get("iconUrl")

		const likes: string[] = doc.get("likes")

		// 値を使ってUserオブジェクトを作成
		const user: User = {
			id: id,
			createdAt: createdAt,
			displayName: displayName,
			iconUrl: iconUrl,
			likes: likes
		}

		return user
	}



	static async readUser(userId: string, fromCache?: boolean): Promise<User | null> {

		// 参照を取得
		const docRef = doc(db, "users", userId)

		try {

			// データ読み取り
			const doc = !fromCache ? await getDoc(docRef) : await getDocFromCache(docRef)

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



	// 特定のスポットをいいねしたユーザーのIDの配列
	static async onUserIdsLikeSpotChanged(
		spotId: string,
		callback: (userIds: string[]) => unknown,
		cancelCallback: (error: Error) => unknown,
	): Promise<Unsubscribe> {

		// 読み取りクエリを作成
		const q = query(
			collection(db, "users"),
			where("likes", "array-contains", spotId),
			limit(100)
		)

		// リアルタイムリスナーを設定
		return onSnapshot(q, async (querySnapshot) => {

			// 成功
			console.log(`SUCCESS! Read ${querySnapshot.size} users.`)

			// userIdの配列を作成
			let userIds: string[] = []
			querySnapshot.forEach((doc) => {

				const userId = doc.id
				userIds.push(userId)
			})

			// Stateを更新
			callback(userIds)

		}, (error) => {

			console.log(`FAIL! Error listening users. ${error}`)
			cancelCallback(error)
		})
	}



	static async createUser(userId: string): Promise<string | null> {

		try {

			// 新しいUserを作成
			await setDoc(doc(db, "users", userId), {
				createdAt: serverTimestamp(),
				displayName: "Guest",
				iconUrl: "https://firebasestorage.googleapis.com/v0/b/skyblue-32fbd.appspot.com/o/icons%2Fdefault_icon.png?alt=media&token=7972a568-e171-4865-bbc4-1b014a43de85",
				likes: []
			})
			console.log(`SUCCESS! Created 1 User.`)

			// 成功したらドキュメントIDをメソッド呼び出し元に返す
			return userId

		} catch (error) {

			console.log(`FAIL! Error to User creation. ${error}`)
			return null
		}
	}



	static async likeSpot(spotId: string): Promise<string | null> {

		// 自分のuserId
		const userId = await AuthService.uid()
		if (!userId) return null

		// 自分のUserへの参照
		const ref = doc(db, "users", userId)

		// likesフィールドにSpotのIDを追加
		try {

			await updateDoc(ref, {
				likes: arrayUnion(spotId),
			})

			console.log(`SUCCESS! Liked 1 Spot.`)
			return userId

		} catch (error) {

			console.log(`FAIL! Failed to like spot. ${error}`)
			return null
		}
	}



	static async unlikeSpot(spotId: string): Promise<string | null> {

		// 自分のuserId
		const userId = await AuthService.uid()
		if (!userId) return null

		// 自分のUserへの参照
		const ref = doc(db, "users", userId)

		// likesフィールドからSpotのIDを削除
		try {

			await updateDoc(ref, {
				likes: arrayRemove(spotId),
			})

			console.log(`SUCCESS! Unliked 1 Spot.`)
			return userId

		} catch (error) {

			console.log(`FAIL! Failed to unlike spot. ${error}`)
			return null
		}
	}
}

export default UserService