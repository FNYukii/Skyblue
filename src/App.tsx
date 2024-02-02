import { BrowserRouter, Routes, Route } from "react-router-dom"
import TopScreen from "./screens/TopScreen"
import NotFoundScreen from "./screens/NotFoundScreen"
import Header from "./components/Header"

function App() {

	return (

		<BrowserRouter>

			<Header />

			<main className="mx-auto   w-full lg:w-[1024px]   px-4 lg:px-0   py-4 ">

				<Routes>
					<Route path="/" element={<TopScreen />} />
					<Route path="*" element={<NotFoundScreen />} />
				</Routes>
			</main>

		</BrowserRouter>
	)
}

export default App
