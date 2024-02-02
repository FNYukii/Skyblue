import { DocumentSnapshot, QueryDocumentSnapshot, collection, getDocs, limit, query } from "firebase/firestore"
import Spot from "../entities/Spot"
import { db } from "./firebase"

class SpotService {



	static toSpot(from: DocumentSnapshot | QueryDocumentSnapshot): Spot {

		const doc: DocumentSnapshot = from

		// ドキュメントの各フィールドの値を取り出す
		const id: string = doc.id ?? ""
		const userId: string = doc.get("userId") ?? ""
		const createdAt: Date = doc.get("createdAt") ? doc.get("createdAt").toDate() : new Date()

		const title: string = doc.get("title") ?? ""
		const photos: string[] = doc.get("photos") ?? []
		const detail: string = doc.get("detail") ?? ""

		// 値を使ってSpotオブジェクトを作成
		const spot: Spot = {
			id: id,
			userId: userId,
			createdAt: createdAt,

			photos: photos,
			title: title,
			detail: detail,
		}

		return spot
	}



	static async readSpots(): Promise<Spot[] | null> {

		// クエリを用意
		const q = query(
			collection(db, "spots"),
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



	static async createSpot(): Promise<string | null> {

		return null
	}
}

export default SpotService