import { DocumentSnapshot, QueryDocumentSnapshot, addDoc, collection, getDocs, limit, query, serverTimestamp } from "firebase/firestore"
import Spot from "../entities/Spot"
import { db } from "./firebase"
import AuthService from "./AuthService"

class SpotService {



	static toSpot(from: DocumentSnapshot | QueryDocumentSnapshot): Spot {

		const doc: DocumentSnapshot = from

		// ドキュメントの各フィールドの値を取り出す
		const id: string = doc.id ?? ""
		const userId: string = doc.get("userId") ?? ""
		const createdAt: Date = doc.get("createdAt") ? doc.get("createdAt").toDate() : new Date()

		const images: string[] = doc.get("images") ?? []
		const location: number[] = doc.get("location") ?? []

		const title: string = doc.get("title") ?? ""
		const comment: string = doc.get("comment") ?? ""

		// 値を使ってSpotオブジェクトを作成
		const spot: Spot = {
			id: id,
			userId: userId,
			createdAt: createdAt,

			images: images,
			location: location,

			title: title,
			comment: comment,
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



	static async createSpot(
		imageUrls: string[],
		title: string,
		comment: string,
		location: number[]
	): Promise<string | null> {

		// 値チェック
		if (imageUrls.length === 0 || imageUrls.length > 4) return null
		if (title === "" || !title.match(/\S/g)) return null
		if (comment === "" || !comment.match(/\S/g)) return null
		if (location.length !== 2) return null

		// UIDを取得
		const uid = await AuthService.uid()
		if (!uid) return null

		try {

			// 新しいSpotを追加
			const ref = await addDoc(collection(db, "spots"), {

				userId: uid,
				createdAt: serverTimestamp(),

				images: imageUrls,
				location: location,

				title: title,
				comment: comment
			})

			console.log(`SUCCESS! Created 1 Spot.`)

			// 成功したらドキュメントIDをメソッド呼び出し元に返す
			return ref.id

		} catch (error) {

			console.log(`FAIL! Error to Spot creation. ${error}`)
			return null
		}
	}
}

export default SpotService