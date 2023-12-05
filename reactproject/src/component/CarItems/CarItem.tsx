import { Link } from 'react-router-dom'
import { ICar } from '../../types/cars.interface'
import styles from '../CarItems/CarItem.module.css'
import Price from './Price'

//форма для создания отображения данных

function CarItem({ car }: { car: ICar }) {
	return (
		<div className={styles.carItem}>
			<div
				className={styles.image}
				style={{ backgroundImage: `url(${car.img})` }}
			/>
			<div className={styles.info}>
				<h2>{car.name}</h2>
				<Price price={+car.price} />
				<Link className={styles.btn} to={`/car/id:${car.id}`}>
					Read more
				</Link>
			</div>
		</div>
	)
}

export default CarItem
