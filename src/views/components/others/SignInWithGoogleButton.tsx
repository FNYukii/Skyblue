import AuthService from "../../../utils/AuthService"
import UserService from "../../../utils/UserService"

function SignInWithGoogleButton() {

	async function signIn() {

		// Authenticationでサインイン
		const uid = await AuthService.signInWithGoogle()
		if (!uid) return

		// Userドキュメントがあるならサインイン完了
		const user = await UserService.readUser(uid)
		if (user) return
		
		// Userドキュメントが無ければ作成
		const userId = await UserService.createUser(uid)

		// Userドキュメント作成に失敗したらサインアウト
		if (!userId) AuthService.signOut()
	}

	return (
		<button onClick={signIn} className="px-4 py-1 bg-black text-white rounded-full   hover:bg-gray-600 transition">Googleでサインイン</button>
	)
}

export default SignInWithGoogleButton