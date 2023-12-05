import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import LogoutIcon from '@mui/icons-material/Logout'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import IconButton from '@mui/material/IconButton'
import Link from '@mui/material/Link'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import { ThemeProvider } from '@mui/material/styles'
import React, { ChangeEvent, FC, useState } from 'react'
import { ICar } from '../../types/cars.interface'
import { iCatalog } from '../../types/darkModeBut.interface'
import CreateDialogF from '../DialogForm/CreateDialogForm'
import MenuShow from '../MenuDrawer/MenuShow'
import SearchBar from '../SearchBar/SearchBarF'
import styles from './Album.module.css'
import AlbumItem from './AlbumItem'
import PaginatedList from './Pagination/pagination'

function Copyright() {
	return (
		<Typography variant='body2' color='text.secondary' align='center'>
			{'Copyright © '}
			<Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

interface iAlbom extends iCatalog {
	cars: ICar[]
	setCars: React.Dispatch<React.SetStateAction<ICar[]>>
}

const Album: FC<iAlbom> = ({ cars, setCars, myTheme, darkMode, setDarkMode }) => {
	const LogOutCLick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		localStorage.removeItem('authToken')
		window.location.replace('/')
	}

	const [searchText, setsearchText] = useState('')
	const searchChange = (e: ChangeEvent<HTMLInputElement>) => {
		setsearchText(e.target.value)
	}

	// const { user, setUser } = useContext(AuthContext)
	return (
		<ThemeProvider theme={myTheme}>
			<CssBaseline />
			<AppBar position='relative'>
				<Toolbar className={styles.header}>
					<MenuShow cars={cars} setCars={setCars} />
					<Typography variant='h6' color='inherit' noWrap>
						Cars catalog
					</Typography>
					<SearchBar change={(e: ChangeEvent<HTMLInputElement>) => searchChange(e)} />
					<CreateDialogF setCars={setCars} />
				</Toolbar>
			</AppBar>

			<Box className={styles.dops}>
				<IconButton sx={{ ml: 1 }} onClick={() => setDarkMode(!darkMode)} color='inherit'>
					{darkMode === true ? <Brightness7Icon /> : <Brightness4Icon />}
				</IconButton>
				<div className={styles.greeting}>
					<Typography>
						<h2 style={{ margin: '10px' }}>Welcome</h2>
						<IconButton
							onClick={e => {
								LogOutCLick(e)
							}}
						>
							<LogoutIcon />
						</IconButton>
					</Typography>
				</div>
			</Box>

			<main>
				{/* Hero unit */}
				<Box
					style={{
						paddingBottom: '0px',
					}}
					sx={{
						bgcolor: 'background.paper',
						pt: 8,
						pb: 6,
					}}
				>
					<Container maxWidth='sm'>
						<Typography
							component='h1'
							variant='h2'
							align='center'
							color='text.primary'
							gutterBottom
						>
							Cars catalog
						</Typography>
						<Typography variant='h5' align='center' color='text.secondary' paragraph>
							Our catalog of BMW cars models
						</Typography>
					</Container>
					<>
						<PaginatedList setCars={setCars} myTheme={myTheme} searchQuery={searchText} />
					</>
				</Box>
				<Container sx={{ py: 8 }} maxWidth='md'>
					{/* End hero unit */}
					<Grid container spacing={4}>
						{cars.map(card => (
							<AlbumItem key={card.id} car={card} cars={cars} setCars={setCars} />
						))}
					</Grid>
				</Container>
			</main>
			{/* Footer */}
			<Box sx={{ bgcolor: 'background.paper', p: 6 }} component='footer'>
				<Typography variant='h6' align='center' gutterBottom>
					Footer
				</Typography>
				<Typography variant='subtitle1' align='center' color='text.secondary' component='p'>
					Something here to give the footer a purpose!
				</Typography>
				<Copyright />
			</Box>
			{/* End footer */}
		</ThemeProvider>
	)
}

export default Album
