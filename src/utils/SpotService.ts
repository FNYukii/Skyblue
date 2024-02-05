import { DocumentSnapshot, QueryDocumentSnapshot, Unsubscribe, addDoc, arrayRemove, arrayUnion, collection, doc, getDoc, getDocFromCache, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from "firebase/firestore"
import Spot from "../entities/Spot"
import { db } from "./firebase"
import AuthService from "./AuthService"

class SpotService {



	static toSpot(from: DocumentSnapshot | QueryDocumentSnapshot): Spot {

		const doc: DocumentSnapshot = from

		// ドキュメントの各フィールドの値を取り出す
		const id: string = doc.id
		const userId: string = doc.get("userId")
		const createdAt: Date = doc.get("createdAt")?.toDate() ?? undefined // Spot作成直後にオフラインデータベースがSpotを読み取る際、serverTimestampがまだ設定されていないことがあるので"??"が必要

		const imageUrls: string[] = doc.get("imageUrls")
		const location: number[] = doc.get("location")
		const name: string = doc.get("name")
		const detail: string = doc.get("detail")

		const likedUserIds: string[] = doc.get("likedUserIds")

		// 値を使ってSpotオブジェクトを作成
		const spot: Spot = {
			id: id,
			userId: userId,
			createdAt: createdAt,

			imageUrls: imageUrls,
			location: location,
			name: name,
			detail: detail,

			likedUserIds: likedUserIds
		}

		return spot
	}



	static async readSpot(spotId: string, fromCache?: boolean): Promise<Spot | null> {

		// 参照を取得
		const docRef = doc(db, "spots", spotId)

		try {

			// データ読み取り
			const doc = !fromCache ? await getDoc(docRef) : await getDocFromCache(docRef)

			// ドキュメントが無ければ失敗と扱う
			if (!doc.exists()) {
				console.log(`FAIL! Spot "${spotId}" is not exist.`)
				return null
			}
			console.log(`SUCCESS! Read 1 Spot.`)

			const spot = this.toSpot(doc)
			return spot

		} catch (error) {

			console.log(`FAIL! Error reading Spot. ${error}`)
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

		// データ読み取り
		try {

			// サーバーorキャッシュから読み取り
			const querySnapshot = await getDocs(q)
			console.log(`SUCCESS! Read ${querySnapshot.size} Spots.`)

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



	static async onSpotChanged(
		spotId: string,
		callback: (spot: Spot) => unknown,
		cancelCallback: (error: Error) => unknown,
	): Promise<Unsubscribe> {

		return onSnapshot(doc(db, "spots", spotId), (doc) => {

			// ドキュメントがなかった場合
			if (!doc.exists) {

				const error = new Error("Document does not exists.")

				console.error(`FAIL! Error to listen Spot. ${error}`)
				cancelCallback(error)
				return
			}

			// ドキュメントがあった場合
			const spot = this.toSpot(doc)
			callback(spot)

		}, (error) => {

			console.error(`FAIL! Error to listen Spot. ${error}`)
			cancelCallback(error)
		})
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

			// 成功
			console.log(`SUCCESS! Read ${querySnapshot.size} spots.`)

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



	static async createSpot(
		imageUrls: string[],
		location: number[],
		name: string,
		detail: string
	): Promise<string | null> {

		// 値チェック
		if (imageUrls.length === 0 || imageUrls.length > 4) return null
		if (location.length !== 2) return null

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

			console.log(`SUCCESS! Created 1 Spot ${ref.id}.`)

			// 成功したらドキュメントIDをメソッド呼び出し元に返す
			return ref.id

		} catch (error) {

			console.log(`FAIL! Error to Spot creation. ${error}`)
			return null
		}
	}



	static async likeSpot(spotId: string): Promise<string | null> {

		// 自分のuserId
		const userId = await AuthService.uid()
		if (!userId) return null

		// Spotへの参照
		const ref = doc(db, "spots", spotId)

		// 配列型であるSpotのlikedUserIdsフィールドに、userIdを追加
		try {

			await updateDoc(ref, {
				likedUserIds: arrayUnion(userId),
			})

			console.log(`SUCCESS! Like 1 Spot.`)
			return spotId

		} catch (error) {

			console.log(`FAIL! Failed to like spot. ${error}`)
			return null
		}
	}



	static async unlikeSpot(spotId: string): Promise<string | null> {

		// 自分のuserId
		const userId = await AuthService.uid()
		if (!userId) return null

		// Spotへの参照
		const ref = doc(db, "spots", spotId)

		// 配列型であるSpotのlikedUserIdsフィールドから、userIdを削除
		try {

			await updateDoc(ref, {
				likedUserIds: arrayRemove(userId),
			})

			console.log(`SUCCESS! Unlike 1 Spot.`)
			return spotId

		} catch (error) {

			console.log(`FAIL! Failed to unlike spot. ${error}`)
			return null
		}
	}
}

export default SpotService