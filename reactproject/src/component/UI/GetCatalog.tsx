import { FC } from 'react'
import styles from '../../component/UI/GetCatalog.module.css'
import { ICar } from '../../types/cars.interface'
import CarItem from '../CarItems/CarItem'

//форма для вывода всех машин

interface iCatalog {
	cars: ICar[]
}

const GetCatalog: FC<iCatalog> = ({ cars }) => {
	return (
		<div className={styles.catalog}>
			{cars.length ? (
				cars.map(car => <CarItem key={car.id} car={car} />)
			) : (
				<p>Cars there aren`t</p>
			)}
		</div>
	)
}

export default GetCatalog
