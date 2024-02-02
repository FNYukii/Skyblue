import { BrowserRouter, Routes, Route } from "react-router-dom"
import TopScreen from "./screens/TopScreen"
import NotFoundScreen from "./screens/NotFoundScreen"
import Header from "./components/Header"
import Footer from "./components/Footer"

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

			<Footer className="sticky top-full"/>

		</BrowserRouter>
	)
}

export default App
