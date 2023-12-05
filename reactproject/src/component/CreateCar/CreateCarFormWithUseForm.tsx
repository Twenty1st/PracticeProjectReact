import React, { FC } from 'react'
import { useForm } from 'react-hook-form'
import { ICar } from '../../types/cars.interface'
import styles from './CreateCarForm.module.css'

interface CreateCarFormProps {
	setCars: React.Dispatch<React.SetStateAction<ICar[]>>
}

//форма для добавления новых данных с помощью useForm

const CreateCarFormUse: FC<CreateCarFormProps> = ({ setCars }) => {
	const {
		reset,
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<ICar>({
		mode: 'onChange',
	})

	const createCar = (data: ICar) => {
		setCars(prev => [
			...prev,
			{
				id: data.name + '' + Math.floor(Math.random() * 100),
				name: data.name,
				price: data.price,
				img: data.img,
			},
		])

		reset()
	}

	return (
		<form className={styles.carForm} onSubmit={handleSubmit(createCar)}>
			<input
				{...register('name', { required: 'Name' })}
				placeholder='car name'
			/>
			{errors?.name?.message && (
				<b
					style={{ color: 'red', margin: '0', padding: '0', fontSize: '12px' }}
				>
					Name is required
				</b>
			)}

			<input
				{...register('price', { required: true })}
				placeholder='car price'
			/>

			<input {...register('img', { required: true })} placeholder='car image' />

			<button className={styles.btn}>Create car</button>
		</form>
	)
}

export default CreateCarFormUse
