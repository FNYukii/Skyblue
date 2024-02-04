import { DocumentSnapshot, QueryDocumentSnapshot, Unsubscribe, addDoc, collection, doc, getDoc, getDocFromCache, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, where } from "firebase/firestore"
import Spot from "../entities/Spot"
import { db } from "./firebase"
import AuthService from "./AuthService"

class SpotService {



	static toSpot(from: DocumentSnapshot | QueryDocumentSnapshot): Spot {

		const doc: DocumentSnapshot = from

		// ドキュメントの各フィールドの値を取り出す
		const id: string = doc.id
		const userId: string = doc.get("userId")
		const createdAt: Date = doc.get("createdAt").toDate()

		const imageUrls: string[] = doc.get("imageUrls")
		const location: number[] = doc.get("location")

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
			detail: detail
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



	static async onSpotsByUserChanged(
		userId: string,
		callback: (payments: Spot[]) => unknown,
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
			})

			console.log(`SUCCESS! Created 1 Spot.`)

			// 成功したらドキュメントIDをメソッド呼び出し元に返す
			return ref.id

		} catch (error) {

			console.log(`FAIL! Error to Spot creation. ${error}`)
			return null
		}
	}



	// static detailPlaceholder(): string {

	// 	const placeholders = [
	// 		"なんて美しい外観!",
	// 		"それはとても巨大に見えます",
	// 		"見ていると首が痛くなりそう",
	// 		"重厚感のある柱!",
	// 		"よく設計された壮麗な意匠",
	// 		"頑丈そうですね",
	// 		"建設中の頃から見てました",
	// 		"いつの間にか竣工してました",
	// 		"一番好きな建物です!",
	// 		"歴史的な建造物と評価されています",
	// 		"環境負荷の低い設計がなされています",
	// 		"よく見に行きます",
	// 		"(｀・ω・´)つ"
	// 	]

	// 	const num = Math.floor(Math.random() * placeholders.length)

	// 	return placeholders[num]
	// }
}

export default SpotService