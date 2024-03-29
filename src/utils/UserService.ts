import { DocumentSnapshot, QueryDocumentSnapshot, Unsubscribe, arrayRemove, arrayUnion, collection, doc, getDoc, getDocFromCache, limit, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore"
import { db } from "./firebase"
import User from "../entities/User"
import AuthService from "./AuthService"
import Image from "../entities/Image"



class UserService {

	static toUser(from: DocumentSnapshot | QueryDocumentSnapshot): User {

		const doc: DocumentSnapshot = from

		// ドキュメントの各フィールドの値を取り出す
		const id: string = doc.id
		const createdAt: Date = doc.get("createdAt")?.toDate() ?? undefined
		const displayName: string = doc.get("displayName")
		const icon: Image | null = doc.get("icon") ?? null

		const likes: string[] = doc.get("likes")

		// 値を使ってUserオブジェクトを作成
		const user: User = {
			id: id,
			createdAt: createdAt,
			displayName: displayName,
			icon: icon,
			likes: likes
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

			const user = this.toUser(doc)
			return user

		} catch (error) {

			console.log(`FAIL! Error reading user. ${error}`)
			return null
		}
	}

	static async readUserFromCache(userId: string): Promise<User | null> {

		// 参照を取得
		const docRef = doc(db, "users", userId)

		try {

			// データ読み取り
			const doc = await getDocFromCache(docRef)

			// ドキュメントが無ければ失敗と扱う
			if (!doc.exists()) {
				console.log(`FAIL! User "${userId}" is not exist from cache.`)
				return null
			}

			const user = this.toUser(doc)
			return user

		} catch (error) {

			console.log(`FAIL! Error reading user from cache. ${error}`)
			return null
		}
	}




	static async onUserChanged(
		userId: string,
		callback: (user: User) => unknown,
		cancelCallback: (error: Error) => unknown,
	): Promise<Unsubscribe> {

		return onSnapshot(doc(db, "users", userId), (doc) => {

			// ドキュメントがなかった場合
			if (!doc.exists) {

				const error = new Error("Document does not exists.")

				console.error(`FAIL! Error to listen User. ${error}`)
				cancelCallback(error)
				return
			}

			// ドキュメントがあった場合
			const user = this.toUser(doc)
			callback(user)

		}, (error) => {

			console.error(`FAIL! Error to listen User. ${error}`)
			cancelCallback(error)
		})
	}



	// 特定のPostをいいねしたユーザーのIDの配列
	static async onUserIdsLikePostChanged(
		postId: string,
		callback: (userIds: string[]) => unknown,
		cancelCallback: (error: Error) => unknown,
	): Promise<Unsubscribe> {

		// 読み取りクエリを作成
		const q = query(
			collection(db, "users"),
			where("likes", "array-contains", postId),
			limit(100)
		)

		// リアルタイムリスナーを設定
		return onSnapshot(q, async (querySnapshot) => {

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
				icon: null,
				likes: []
			})

			// 成功したらドキュメントIDをメソッド呼び出し元に返す
			return userId

		} catch (error) {

			console.log(`FAIL! Error to User creation. ${error}`)
			return null
		}
	}



	static async likePost(postId: string): Promise<string | null> {

		// 自分のuserId
		const userId = await AuthService.uid()
		if (!userId) return null

		// 自分のUserへの参照
		const ref = doc(db, "users", userId)

		// likesフィールドにpostIdを追加
		try {

			await updateDoc(ref, {
				likes: arrayUnion(postId),
			})

			return userId

		} catch (error) {

			console.log(`FAIL! Failed to update user. ${error}`)
			return null
		}
	}



	static async unlikePost(postId: string): Promise<string | null> {

		// 自分のuserId
		const userId = await AuthService.uid()
		if (!userId) return null

		// 自分のUserへの参照
		const ref = doc(db, "users", userId)

		// likesフィールドからpostIdを削除
		try {

			await updateDoc(ref, {
				likes: arrayRemove(postId),
			})

			return userId

		} catch (error) {

			console.log(`FAIL! Failed to update user. ${error}`)
			return null
		}
	}



	static async editProfile(displayName?: string, image?: Image): Promise<string | null> {

		// 値チェック
		if (displayName && (displayName === "" || displayName.length > 50)) return null

		// 自分のuserId
		const userId = await AuthService.uid()
		if (!userId) return null

		// 自分のUserへの参照
		const ref = doc(db, "users", userId)

		// 更新内容をオブジェクトで作成
		let docObject: {
			[prop: string]: any
		} = {}

		if (displayName) docObject.displayName = displayName
		if (image) docObject.icon = {path: image.path, url: image.url}

		// ドキュメントを更新
		try {

			await updateDoc(ref, docObject)
			return userId

		} catch (error) {

			console.log(`FAIL! Failed to update user. ${error}`)
			return null
		}
	}
}

export default UserService