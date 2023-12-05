import * as React from 'react'
import { createContext, Dispatch, FC, SetStateAction, useEffect, useState } from 'react'
import Album from './component/Album/Album'
import { useFavorites } from './hooks/useFavorites'
import { useThemeDetector } from './hooks/useThemeDetector'
import { ICar } from './types/cars.interface'
import { iCatalog } from './types/darkModeBut.interface'

type TypeContext = {
	cars: ICar[]
	setCars: Dispatch<SetStateAction<ICar[]>>
}

export const getCars = createContext<TypeContext>({
	cars: [],
	setCars: () => {},
})

const ColorModeContext = React.createContext({ toggleColorMode: () => {} })

const UpdateCatalog: FC<iCatalog> = ({ myTheme, darkMode, setDarkMode }) => {
	const [cars, setCars] = useState<ICar[]>([])
	const { favorites } = useFavorites()

	const isDarkTheme = useThemeDetector()
	const checkAuth = () => {
		const token = localStorage.getItem('authToken')
		if (!!!token) {
			window.location.replace('/')
		}
		console.log(!!token)
	}

	useEffect(() => {
		checkAuth()
		// if (cars !== favorites) {
		// 	//getData()
		// }
	}, [])

	return (
		<div>
			<Album
				cars={cars}
				setCars={setCars}
				myTheme={myTheme}
				darkMode={darkMode}
				setDarkMode={setDarkMode}
			/>
			<div></div>
		</div>
	)
}

export default UpdateCatalog
