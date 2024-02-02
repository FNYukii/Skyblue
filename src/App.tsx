import { BrowserRouter, Routes, Route } from "react-router-dom"
import TopScreen from "./screens/TopScreen"
import NotFoundScreen from "./screens/NotFoundScreen"

function App() {

	return (

		<BrowserRouter>

			<Routes>

				<Route path="/" element={<TopScreen />} />
				<Route path="*" element={<NotFoundScreen />} />
			</Routes>
		</BrowserRouter>
	)
}

export default App
