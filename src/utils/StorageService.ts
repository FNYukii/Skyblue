import { getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"
import { v4 } from "uuid"

class StorageService {

	

	static async uploadImage(file: File, folderName: string): Promise<string | null> {

		// ファイルサイズが10MB未満かどうかを確認
		const fileSizeMax = 10485760
		if (file.size > fileSizeMax) return null

		// ファイルの拡張子を取得
		const fileName = file.name
		const fileType: string = fileName.split('.').pop()!

		// UUIDを使って新しいファイル名を生成
		const randomStr = v4()
		const newFileName: string = `${randomStr}.${fileType}`

		// Firebase Cloud Storageの参照を作成
		const storageRef = ref(storage, `${folderName}/${newFileName}`)

		// ファイルをアップロード
		return await uploadBytes(storageRef, file)
			.then(async () => {

				// DownloadURLを取得
				const downloadURL = await getDownloadURL(storageRef)

				return downloadURL
			})
			.catch((error: any) => {

				console.log(`File uploading failed. ${error}`)
				return null
			})
	}



	static async uploadImages(files: File[], folderName: string): Promise<string[] | null> {

		let imageUrls: string[] = []

		// 画像を順にアップロードしていく
		for (let file of files) {

			// 画像をアップロード
			const imageUrl = await this.uploadImage(file, folderName)

			// 失敗
			if (!imageUrl)
				return null

			// 成功
			imageUrls.push(imageUrl)
		}

		return imageUrls
	}
}

export default StorageService