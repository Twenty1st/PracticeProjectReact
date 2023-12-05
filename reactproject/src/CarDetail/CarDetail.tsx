import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import { Theme, ThemeProvider } from '@mui/material/styles'
import { FC, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { CarService } from '../CarService/car.service'
import AlbumItem from '../component/Album/AlbumItem'
import styles from '../component/CarItems/CarItem.module.css'
import { ICar } from '../types/cars.interface'

//форма , когда переходишь для просмотра конкретного автомобиля

interface iCarDetail {
	theme: Theme
}
// webpack-cli": "^5.1.4"
const CarDetail: FC<iCarDetail> = ({ theme }) => {
	const { id } = useParams()

	const [car, setCar] = useState<ICar>()

	const EmptyCar = {
		id: '0',
		name: 'name',
		price: '0',
		img: 'null',
	}

	async function getDataid(id: string) {
		const data = await CarService.getById(id)
		setCar(data)
	}

	useEffect(() => {
		if (!id) return
		const currentID = id.split(':')[1]
		getDataid(currentID)
	}, [id])

	if (!car?.name) return <p>Loading...</p>
	console.log(theme)
	return (
		<ThemeProvider theme={theme}>
			<Box sx={{ bgcolor: 'background.paper', p: 1, height: '100vh' }}>
				<Link className={styles.btn} to='/catalog'>
					Back
				</Link>
				{/* <CarItem car={car} /> */}
				<Container style={{ width: '250px', margin: '10px 10px' }}>
					<AlbumItem car={car} cars={[]} setCars={() => {}} />
				</Container>
			</Box>
		</ThemeProvider>
	)
}

export default CarDetail
