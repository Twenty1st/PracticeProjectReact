import { Dispatch, FC, SetStateAction, createContext, useEffect, useState } from 'react'
import { CarService } from './CarService/car.service'
import { useFavorites } from './hooks/useFavorites'
import { ICar } from './types/cars.interface'

//главный файл

type TypeContext = {
	cars: ICar[]
	setCars: Dispatch<SetStateAction<ICar[]>>
}

export const getCars = createContext<TypeContext>({
	cars: [],
	setCars: () => {},
})

const Catalog: FC = props => {
	// const checkAuth = () => {
	// 	const token = localStorage.getItem('authToken')
	// 	console.log(token)
	// 	if (token === 'false') {
	// 		window.location.replace('/')
	// 	}
	// }
	const [cars, setCars] = useState<ICar[]>([])

	const { favorites } = useFavorites()
	useEffect(() => {
		if (cars !== favorites) {
			const data = CarService.getAll('')
		}
	}, [cars])

	return (
		<div>
			{/* <div className={styles.head}>
				<h1>Cars catalog</h1>
				<Timenow />
			</div>
			<Header />
			<div>
				<CreateCarForm setCars={setCars} />				
			</div> */}
			{/* <Album cars={cars} setCars={setCars} /> */}
			<div></div>
		</div>
	)
}

export default Catalog
