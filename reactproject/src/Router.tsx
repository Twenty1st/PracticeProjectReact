import { createTheme } from '@mui/material'
import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import CarDetail from './CarDetail/CarDetail'
import UpdateCatalog from './CatalogTest'
import AuthWrapper from './component/Authorization/AuthWraper'
import Registration from './component/Registration/CreateNewUser'
//роутер для возможности перехода на новую страницу без перезагрузки сайта

const Router = () => {
	const [darkMode, setDarkMode] = useState(false)

	const myTheme = createTheme({
		palette: {
			mode: darkMode ? 'dark' : 'light',
		},
	})

	return (
		<BrowserRouter>
			<Routes>
				<Route element={<AuthWrapper />} path='/' />
				<Route element={<Registration />} path='/registration' />
				<Route
					element={
						<UpdateCatalog darkMode={darkMode} setDarkMode={setDarkMode} myTheme={myTheme} />
					}
					path='/catalog'
				/>

				<Route element={<CarDetail theme={myTheme} />} path='/car/:id' />

				<Route path='*' element={<div>Not found</div>} />
			</Routes>
		</BrowserRouter>
	)
}

export default Router
