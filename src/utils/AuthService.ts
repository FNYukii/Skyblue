import { createUserWithEmailAndPassword, deleteUser, signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "./firebase"

class AuthService {

	static uid(): Promise<string | null> {

		return new Promise((resolve) => {

			var unsubscribe = auth.onAuthStateChanged((user) => {

				// UIDをresolve
				const uid = user?.uid ?? null

				resolve(uid)

				// 登録解除
				unsubscribe()
			})
		})
	}



	// Authの初期化を待たずにUIDを読み取る
	// Webページ生成直後に呼び出すと、ログイン済みでもnullを返すことがある
	static uidQuickly(): string | null {

		const uid = auth.currentUser?.uid

		if (uid) {
			return uid
		} else {
			return null
		}
	}



	static email(): string | null {

		const user = auth.currentUser
		if (!user) return null

		const email = user.email
		if (!email) return null

		return email
	}



	static async signUp(email: string, password: string): Promise<string | null> {

		return createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {

				// 成功
				const uid = userCredential.user.uid
				return uid
			})
			.catch((error) => {

				// 失敗
				console.log(`Failed to sign up. ${error}`)
				return null
			})
	}



	static async signIn(email: string, password: string): Promise<string | null> {

		return signInWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {

				// 成功
				const uid = userCredential.user.uid
				return uid
			})
			.catch((error) => {

				// 失敗
				console.log(`Failed to sign in. ${error}`)
				return null
			})
	}



	static async signOut(): Promise<string | null> {

		const uid = this.uid()

		// 未ログイン状態なら終了
		if (uid === null) {
			return null
		}

		// サインアウト実行
		return auth.signOut()
			.then(() => {

				// 成功
				return uid
			})
			.catch((error) => {

				console.log(`FAIL! Failed to sign out. ${error}`)
				return null
			})
	}



	static async deleteUser(): Promise<string | null> {

		// ユーザーを取得
		const user = auth.currentUser
		if (!user) return null

		// ユーザーを削除
		return deleteUser(user)
			.then(() => {

				return user.uid

			}).catch((error) => {

				return null
			})
	}
}

export default AuthService