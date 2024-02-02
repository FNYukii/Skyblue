import { BrowserRouter, Routes, Route } from "react-router-dom"
import TopScreen from "./views/screens/TopScreen"
import NotFoundScreen from "./views/screens/NotFoundScreen"
import Header from "./views/components/Header"
import Footer from "./views/components/Footer"

function App() {

	return (

		<BrowserRouter>

			<Header />

			<main className="mx-auto   w-full lg:w-[1024px]   px-4 lg:px-0">

				<Routes>
					<Route path="/" element={<TopScreen />} />
					<Route path="*" element={<NotFoundScreen />} />
				</Routes>
			</main>

			<Footer className="mt-16   sticky top-full"/>

		</BrowserRouter>
	)
}

export default App
