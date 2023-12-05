import { Theme } from '@mui/material'
import Pagination from '@mui/material/Pagination'
import Stack from '@mui/system/Stack'
import { useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import { CarService } from '../../../CarService/car.service'
import { ICar } from '../../../types/cars.interface'
import styles from './pagination.module.css'

interface iPagination {
	setCars: React.Dispatch<React.SetStateAction<ICar[]>>
	myTheme: Theme
	searchQuery: string
}
const row_amount = 10

const PaginatedList = ({ setCars, myTheme, searchQuery }: iPagination) => {
	const [allRows, setAllRows] = useState(0)
	const [currentPage, setCurrentPage] = useState(1)

	const putQuery = (page: number) => {
		let search = ''
		if (searchQuery !== '') {
			search = " ORDER BY CASE WHEN name LIKE '" + searchQuery + "%' THEN 0 ELSE 1 END "
		}
		const query = search + ' limit ' + row_amount + ' offset ' + row_amount * (page - 1)
		getCars(query)
	}

	useEffect(() => {
		putQuery(currentPage)
	}, [searchQuery])

	useEffect(() => {
		const CountRows = async () => {
			const count = await CarService.countAll()
			setAllRows(Number(count))
			putQuery(currentPage)
		}
		CountRows()
	}, [])

	const getCars = async (query: string) => {
		const cars = await CarService.getAll(query)
		setCars(cars)
	}

	const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
		setCurrentPage(value)
		putQuery(value)
	}
	return (
		<ThemeProvider theme={myTheme}>
			<Stack>
				<Pagination
					count={Math.ceil(allRows / row_amount)}
					showFirstButton
					showLastButton
					page={currentPage}
					onChange={handlePageChange}
					className={styles.Stacklist}
				/>
			</Stack>
		</ThemeProvider>
	)
}

export default PaginatedList
