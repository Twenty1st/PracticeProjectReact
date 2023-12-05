import { FC, useState } from 'react'
import { CarService } from '../../CarService/car.service'
import { ICar } from '../../types/cars.interface'
import styles from './CreateCarForm.module.css'

interface CreateCarFormProps {
	setCars: React.Dispatch<React.SetStateAction<ICar[]>>
}

//форма для добавления новых данных

const CreateCarForm: FC<CreateCarFormProps> = ({ setCars }) => {
	const [data, setData] = useState({
		name: '',
		price: '',
		img: '',
	})

	const [errorName, setErrorName] = useState('')
	const [errorPrice, setErrorPrice] = useState('')
	const [errorImg, setErrorImg] = useState('')

	const clearData = {
		name: '',
		price: '',
		img: '',
	}

	const createCar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		if (!data.name) {
			setErrorName('< Заполните поле')
		} else if (!data.price) {
			setErrorName('')
			setErrorPrice('< Заполните поле')
		} else if (!data.img) {
			setErrorPrice('')
			setErrorImg('< Заполните поле')
		} else {
			setErrorImg('')
			setErrorName('')
			setErrorPrice('')
			setCars(prev => [
				...prev,
				{
					id: data.name + '' + Math.floor(Math.random() * 100),
					name: data.name,
					price: data.price,
					img: data.img,
				},
			])
			CarService.addCar(data)
			setData(clearData)
		}
	}

	return (
		<form className={styles.carForm}>
			<input
				value={data.name}
				onChange={e =>
					setData(prev => ({
						...prev,
						name: e.target.value,
					}))
				}
				type='text'
				placeholder='car name'
			/>
			{errorName && <span className={styles.erorr_msg}>{errorName}</span>}
			<input
				value={data.price}
				onChange={e =>
					setData(prev => ({
						...prev,
						price: e.target.value,
					}))
				}
				type='text'
				placeholder='car price'
			/>
			{errorPrice && <span className={styles.erorr_msg}>{errorPrice}</span>}
			<input
				value={data.img}
				onChange={e =>
					setData(prev => ({
						...prev,
						img: e.target.value,
					}))
				}
				type='text'
				placeholder='car image'
			/>
			{errorImg && <span className={styles.erorr_msg}>{errorImg}</span>}

			<button className={styles.btn} onClick={e => createCar(e)}>
				Create car
			</button>
		</form>
	)
}

export default CreateCarForm
