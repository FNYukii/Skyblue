import { DocumentSnapshot, QueryDocumentSnapshot, Unsubscribe, addDoc, collection, deleteDoc, doc, getDoc, getDocFromCache, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import Post from "../entities/Post"
import { db } from "./firebase"
import AuthService from "./AuthService"
import UserService from "./UserService"

class PostService {

	static toPost(from: DocumentSnapshot | QueryDocumentSnapshot): Post {

		const doc: DocumentSnapshot = from

		// ドキュメントの各フィールドの値を取り出す
		const id: string = doc.id
		const userId: string = doc.get("userId")
		const createdAt: Date = doc.get("createdAt")?.toDate() ?? undefined // Post作成直後にオフラインデータベースがドキュメントを読み取る際、serverTimestampがまだ設定されていないことがあるので"??"が必要

		const imageUrls: string[] = doc.get("imageUrls")
		const location: { lat: number, lng: number } = doc.get("location")
		const name: string = doc.get("name")
		const detail: string = doc.get("detail")

		// 値を使ってPostオブジェクトを作成
		const post: Post = {
			id: id,
			userId: userId,
			createdAt: createdAt,

			imageUrls: imageUrls,
			location: location,
			name: name,
			detail: detail,
		}

		return post
	}



	static async readPost(postId: string): Promise<Post | null> {

		// 参照を取得
		const docRef = doc(db, "posts", postId)

		try {

			// データ読み取り
			const doc = await getDoc(docRef)

			// ドキュメントが無ければ失敗と扱う
			if (!doc.exists()) {
				console.log(`FAIL! Post "${postId}" is not exist.`)
				return null
			}

			const post = this.toPost(doc)
			return post

		} catch (error) {

			console.log(`FAIL! Error to read Post. ${error}`)
			return null
		}
	}

	static async readPostFromCache(postId: string): Promise<Post | null> {

		// 参照を取得
		const docRef = doc(db, "posts", postId)

		try {

			// データ読み取り
			const doc = await getDocFromCache(docRef)

			// ドキュメントが無ければ失敗と扱う
			if (!doc.exists()) {

				console.log(`FAIL! Post "${postId}" is not exist from cache.`)
				return null
			}

			const post = this.toPost(doc)
			return post

		} catch (error) {

			console.log(`FAIL! Error to read Post from cache. ${error}`)
			return null
		}
	}



	static async readPosts(): Promise<Post[] | null> {

		// クエリを用意
		const q = query(
			collection(db, "posts"),
			orderBy("createdAt", "desc"),
			limit(100)
		)

		try {

			// サーバーorキャッシュから読み取り
			const querySnapshot = await getDocs(q)

			// 読み取ったdocumentsをオブジェクト配列に変換
			let posts: Post[] = []
			querySnapshot.forEach(document => {
				const post = this.toPost(document)
				posts.push(post)
			})

			return posts

		} catch (error) {

			// 失敗
			console.log(`FAIL! Error to read posts. ${error}`)
			return null
		}
	}



	static async onPostsByUserChanged(
		userId: string,
		callback: (posts: Post[]) => unknown,
		cancelCallback: (error: Error) => unknown,
	): Promise<Unsubscribe> {

		// 読み取りクエリを作成
		const q = query(
			collection(db, "posts"),
			where("userId", "==", userId),
			orderBy("createdAt", "desc"),
			limit(100)
		)

		// リアルタイムリスナーを設定
		return onSnapshot(q, async (querySnapshot) => {

			// まだバックエンドに書き込まれていないローカル変更は無視
			if (querySnapshot.metadata.hasPendingWrites) return

			// Postの配列を作成
			let posts: Post[] = []
			querySnapshot.forEach((doc) => {

				const post = this.toPost(doc)
				posts.push(post)
			})

			// Stateを更新
			callback(posts)

		}, (error) => {

			console.log(`FAIL! Error to listen posts. ${error}`)
			cancelCallback(error)
		})
	}



	static async onLikesByUserChanged(
		userId: string,
		callback: (posts: Post[]) => unknown,
		cancelCallback: (error: Error) => unknown,
	): Promise<Unsubscribe> {

		return await UserService.onUserChanged(userId, async user => {

			// いいねしたpostのid
			const likeIds = user.likes

			// 0件だったら[]を返す
			if (likeIds.length === 0) {
				callback([])
			}

			// likeIdsの要素の数だけ、そのPostを読み取る
			let posts: Post[] = []
			await Promise.all(likeIds.map(async (likeId) => {

				// Postを読み取る
				const post = await PostService.readPost(likeId)

				// 失敗
				if (post === null) {
					return
				}

				// 成功
				posts.push(post)
			}))

			// いいね日時が降順になるように並べ替え
			posts = posts.reverse()

			callback(posts)

		}, (error) => {
			cancelCallback(error)
		})
	}



	static async createPost(
		imageUrls: string[],
		location: { lat: number, lng: number },
		name: string,
		detail: string
	): Promise<string | null> {

		// 値チェック
		if (imageUrls.length === 0 || imageUrls.length > 4) return null

		if (name === "" || !name.match(/\S/g)) return null
		if (name.length > 50) return null
		if (detail.length > 100) return null

		// UIDを取得
		const uid = await AuthService.uid()
		if (!uid) return null

		try {

			// 新しいPostを追加
			const ref = await addDoc(collection(db, "posts"), {

				userId: uid,
				createdAt: serverTimestamp(),

				imageUrls: imageUrls,
				location: location,
				name: name,
				detail: detail,

				likedUserIds: []
			})

			// 成功したらドキュメントIDをメソッド呼び出し元に返す
			return ref.id

		} catch (error) {

			console.log(`FAIL! Error to create post. ${error}`)
			return null
		}
	}



	static async deletePost(postId: string): Promise<string | null> {

		return deleteDoc(doc(db, "posts", postId))
			.then(() => {

				return postId
			})
			.catch((error) => {

				console.log(`FAIL! Error to delete post. ${error}`)
				return null
			})
	}
}

export default PostService