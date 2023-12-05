import { Button } from '@mui/material'
import TextField from '@mui/material/TextField'
import { FC, useState } from 'react'
import { CarService } from '../../CarService/car.service'
import { ICar } from '../../types/cars.interface'
import styles from './CreateCarForm.module.css'

interface CreateCarFormProps {
	setCars: React.Dispatch<React.SetStateAction<ICar[]>>
}

const CreateCarFormMUI: FC<CreateCarFormProps> = ({ setCars }) => {
	const [data, setData] = useState({
		name: '',
		price: '',
		img: '',
	})

	const [nameError, setnameError] = useState(false)
	const [priceError, setpriceError] = useState(false)
	const [imageError, setimageError] = useState(false)

	const [complete, setComplete] = useState('')

	const clearData = {
		name: '',
		price: '',
		img: '',
	}

	const createCar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		if (data.name === '') {
			setnameError(true)
		}
		if (data.price === '') {
			setpriceError(true)
		}
		if (data.img === '') {
			setimageError(true)
		}
		if (data.name && data.price && data.img) {
			const checkAdding = async () => {
				const check = await CarService.addCar(data)
				if (check) {
					setCars(prev => [
						...prev,
						{
							id: data.name + '' + Math.floor(Math.random() * 1000),
							name: data.name,
							price: data.price,
							img: data.img,
						},
					])
					setData(clearData)
				} else {
					setComplete('Ошибка!')
				}
			}

			checkAdding()
			setpriceError(false)
			setnameError(false)
			setimageError(false)
		}
	}
	return (
		<div className={styles.carForm}>
			<TextField
				label='Car title'
				size='small'
				onChange={e => {
					setData(prev => ({
						...prev,
						name: e.target.value,
					}))
					setComplete('')
				}}
				required
				variant='outlined'
				value={data.name}
				color='secondary'
				type='text'
				error={nameError}
				sx={{ mb: 3 }}
				fullWidth
			/>
			<TextField
				label='Car price'
				size='small'
				onChange={e => {
					setData(prev => ({
						...prev,
						price: e.target.value,
					}))
					setComplete('')
				}}
				required
				variant='outlined'
				color='secondary'
				value={data.price}
				type='text'
				error={priceError}
				sx={{ mb: 3 }}
				fullWidth
			/>
			<TextField
				label='Car image'
				size='small'
				onChange={e => {
					setData(prev => ({
						...prev,
						img: e.target.value,
					}))
					setComplete('')
				}}
				required
				variant='outlined'
				color='secondary'
				type='text'
				error={imageError}
				value={data.img}
				sx={{ mb: 3 }}
				fullWidth
			/>
			<Button variant='outlined' color='secondary' type='submit' onClick={e => createCar(e)}>
				Create car
			</Button>
			<></>
			<h4 style={{ margin: '0 0 0 auto' }}>{complete}</h4>
		</div>
	)
}

export default CreateCarFormMUI
