import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"
import { storage } from "./firebase"
import { v4 } from "uuid"
import Image from "../entities/Image"

class StorageService {



	static async uploadImage(file: File, folderName: string): Promise<Image | null> {

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

				// ファイルのパスとURL
				const path = storageRef.fullPath
				const url = await getDownloadURL(storageRef)
				const image: Image = { path: path, url: url }

				return image
			})
			.catch((error: any) => {

				console.log(`FAIL! Error uploading file. ${error}`)
				return null
			})
	}



	static async uploadImages(files: File[], folderName: string): Promise<Image[] | null> {

		let images: Image[] = []

		await Promise.all(files.map(async (file) => {

			// 画像をアップロード
			const image = await this.uploadImage(file, folderName)

			// 失敗
			if (!image)
				return null

			// 成功
			images.push(image)
		}))

		return images
	}



	static async deleteImage(path: string): Promise<string | null> {

		const storageRef = ref(storage, path)

		return deleteObject(storageRef).then(() => {

			return path

		}).catch((error) => {

			console.log(`FAIL! Error deleting file. ${error}`)
			return null
		})
	}



	static async deleteImages(paths: string[]): Promise<string[] | null> {

		let donePaths: string[] = []

		await Promise.all(paths.map(async (path) => {

			// 画像を削除
			const result = await this.deleteImage(path)

			// 失敗
			if (!result)
				return null

			// 成功
			donePaths.push(result)
		}))

		return donePaths
	}
}

export default StorageService