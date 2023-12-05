import Button from '@mui/material/Button'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import { Dispatch, FC, SetStateAction } from 'react'
import { Link } from 'react-router-dom'
import { CarService } from '../../CarService/car.service'
import { useActions } from '../../hooks/useAction'
import { useFavorites } from '../../hooks/useFavorites'
import { ICar } from '../../types/cars.interface'
import styles from '../CarItems/CarItem.module.css'
import HeartButton from '../CarItems/HeartButton'
import Price from '../CarItems/Price'
import TrashBut from './NiceButton/TrashBut'

interface iItem {
	car: ICar
	cars: ICar[]
	setCars: Dispatch<SetStateAction<ICar[]>>
}

const AlbumItem: FC<iItem> = ({ car, cars, setCars }) => {
	const { favorites } = useFavorites()

	const { toggleFavorites } = useActions()

	const isExist = favorites.some(r => r.id === car.id)

	const handleClick = () => {
		toggleFavorites(car)
	}
	const DeleteClick = async () => {
		const check = await CarService.deleteCar(car.id)
		if (!check) {
			alert('Ошибка')
			return
		}

		const newCars = cars.filter(item => item.id !== car.id)
		setCars(newCars)
	}

	return (
		<Grid item key={car.id} xs={12} sm={6} md={4} style={{ position: 'relative' }}>
			<Card
				sx={{
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
				}}
			>
				<CardMedia
					component='div'
					sx={{
						// 16:9
						pt: '56.25%',
					}}
					image={car.img}
				/>
				<TrashBut click={DeleteClick} />
				<CardContent sx={{ flexGrow: 1 }}>
					<Typography gutterBottom variant='h5' component='h2'>
						{car.name}
					</Typography>
					<Typography>
						<Price price={+car.price} />
					</Typography>
				</CardContent>
				<CardActions>
					<Link className={styles.btn} to={`/car/id:${car.id}`}>
						View
					</Link>
					<Button size='small'>Edit</Button>
					<div>
						<HeartButton
							clasno={styles.Favbtn}
							click={handleClick}
							styleCl={{ color: isExist ? '#ff3939' : '#d8d8d8' }}
						/>
					</div>
				</CardActions>
			</Card>
		</Grid>
	)
}

export default AlbumItem
