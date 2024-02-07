import { DocumentSnapshot, QueryDocumentSnapshot, Unsubscribe, addDoc, collection, doc, getDoc, getDocFromCache, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import Spot from "../entities/Spot"
import { db } from "./firebase"
import AuthService from "./AuthService"
import UserService from "./UserService"

class SpotService {

	static toSpot(from: DocumentSnapshot | QueryDocumentSnapshot): Spot {

		const doc: DocumentSnapshot = from

		// ドキュメントの各フィールドの値を取り出す
		const id: string = doc.id
		const userId: string = doc.get("userId")
		const createdAt: Date = doc.get("createdAt")?.toDate() ?? undefined // Spot作成直後にオフラインデータベースがSpotを読み取る際、serverTimestampがまだ設定されていないことがあるので"??"が必要

		const imageUrls: string[] = doc.get("imageUrls")
		const location: { lat: number, lng: number } = doc.get("location")
		const name: string = doc.get("name")
		const detail: string = doc.get("detail")

		// 値を使ってSpotオブジェクトを作成
		const spot: Spot = {
			id: id,
			userId: userId,
			createdAt: createdAt,

			imageUrls: imageUrls,
			location: location,
			name: name,
			detail: detail,
		}

		return spot
	}



	static async readSpot(spotId: string): Promise<Spot | null> {

		// 参照を取得
		const docRef = doc(db, "spots", spotId)

		try {

			// データ読み取り
			const doc = await getDoc(docRef)

			// ドキュメントが無ければ失敗と扱う
			if (!doc.exists()) {
				console.log(`FAIL! Spot "${spotId}" is not exist.`)
				return null
			}

			const spot = this.toSpot(doc)
			return spot

		} catch (error) {

			console.log(`FAIL! Error reading Spot. ${error}`)
			return null
		}
	}

	static async readSpotFromCache(spotId: string): Promise<Spot | null> {

		// 参照を取得
		const docRef = doc(db, "spots", spotId)

		try {

			// データ読み取り
			const doc = await getDocFromCache(docRef)

			// ドキュメントが無ければ失敗と扱う
			if (!doc.exists()) {

				console.log(`FAIL! Spot "${spotId}" is not exist from cache.`)
				return null
			}

			const spot = this.toSpot(doc)
			return spot

		} catch (error) {

			console.log(`FAIL! Error reading Spot from cache. ${error}`)
			return null
		}
	}



	static async readRecentlySpots(): Promise<Spot[] | null> {

		// クエリを用意
		const q = query(
			collection(db, "spots"),
			orderBy("createdAt", "desc"),
			limit(100)
		)

		try {

			// サーバーorキャッシュから読み取り
			const querySnapshot = await getDocs(q)

			// 読み取ったdocumentsをspotsに変換
			let spots: Spot[] = []
			querySnapshot.forEach(document => {
				const spot = this.toSpot(document)
				spots.push(spot)
			})

			return spots

		} catch (error) {

			// 失敗
			console.log(`FAIL! Spots reading failed. ${error}`)
			return null
		}
	}



	static async onSpotsByUserChanged(
		userId: string,
		callback: (spots: Spot[]) => unknown,
		cancelCallback: (error: Error) => unknown,
	): Promise<Unsubscribe> {

		// 読み取りクエリを作成
		const q = query(
			collection(db, "spots"),
			where("userId", "==", userId),
			orderBy("createdAt", "desc"),
			limit(100)
		)

		// リアルタイムリスナーを設定
		return onSnapshot(q, async (querySnapshot) => {

			// まだバックエンドに書き込まれていないローカル変更は無視
			if (querySnapshot.metadata.hasPendingWrites) return

			// Spotの配列を作成
			let spots: Spot[] = []
			querySnapshot.forEach((doc) => {

				const spot = this.toSpot(doc)
				spots.push(spot)
			})

			// Stateを更新
			callback(spots)

		}, (error) => {

			console.log(`FAIL! Error listening spots. ${error}`)
			cancelCallback(error)
		})
	}



	static async onLikesByUserChanged(
		userId: string,
		callback: (spots: Spot[]) => unknown,
		cancelCallback: (error: Error) => unknown,
	): Promise<Unsubscribe> {

		return await UserService.onUserChanged(userId, async user => {

			// いいねしたspotIds
			const likeSpotIds = user.likes

			// 0件だったら[]を返す
			if (likeSpotIds.length === 0) {
				callback([])
			}

			// likeSpotIdsの要素の数だけ、そのSpotを読み取る
			let spots: Spot[] = []
			await Promise.all(likeSpotIds.map(async (likeSpotId) => {

				// Spotを読み取る
				const spot = await SpotService.readSpot(likeSpotId)

				// 失敗
				if (spot === null) {
					return
				}

				// 成功
				spots.push(spot)
			}))

			// いいね日時が降順になるように並べ替え
			spots = spots.reverse()

			callback(spots)

		}, (error) => {
			cancelCallback(error)
		})
	}



	static async createSpot(
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

			// 新しいSpotを追加
			const ref = await addDoc(collection(db, "spots"), {

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

			console.log(`FAIL! Error to Spot creation. ${error}`)
			return null
		}
	}
}

export default SpotService