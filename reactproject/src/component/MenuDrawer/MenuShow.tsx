import DirectionsCarIcon from '@mui/icons-material/DirectionsCar'
import FavoriteIcon from '@mui/icons-material/Favorite'
import MenuIcon from '@mui/icons-material/Menu'
import Box from '@mui/material/Box'
import Drawer from '@mui/material/Drawer'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import * as React from 'react'
import { CarService } from '../../CarService/car.service'
import { useFavorites } from '../../hooks/useFavorites'
import { ICar } from '../../types/cars.interface'
import NiceBut from '../Album/NiceButton/NiceBut'

type Anchor = 'left'

interface iCatalog {
	cars: ICar[]
	setCars: React.Dispatch<React.SetStateAction<ICar[]>>
}

const MenuShow: React.FC<iCatalog> = ({ cars, setCars }) => {
	const [state, setState] = React.useState({
		left: false,
	})

	const { favorites } = useFavorites()

	const showNew = (index: number) => {
		if (index === 1) {
			const getData = async () => {
				const data = await CarService.getAll(' limit 10 offset 1')
				setCars(data)
			}
			getData()
		} else {
			setCars(favorites)
		}
	}

	const toggleDrawer =
		(anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
			if (
				event.type === 'keydown' &&
				((event as React.KeyboardEvent).key === 'Tab' ||
					(event as React.KeyboardEvent).key === 'Shift')
			) {
				return
			}

			setState({ ...state, [anchor]: open })
		}

	const list = (anchor: Anchor) => (
		<Box
			sx={{ width: 250 }}
			role='presentation'
			onClick={toggleDrawer(anchor, false)}
			onKeyDown={toggleDrawer(anchor, false)}
		>
			<List>
				<ListItem disablePadding>
					<ListItemButton onClick={e => showNew(1)}>
						<ListItemIcon>
							<DirectionsCarIcon />
						</ListItemIcon>
						<ListItemText>Show all models</ListItemText>
					</ListItemButton>
				</ListItem>
				<ListItem disablePadding>
					<ListItemButton onClick={e => showNew(2)}>
						<ListItemIcon>
							<FavoriteIcon />
						</ListItemIcon>
						<ListItemText>Show favorites({favorites.length})</ListItemText>
					</ListItemButton>
				</ListItem>
			</List>
		</Box>
	)

	return (
		<div>
			<React.Fragment key={'left'}>
				<NiceBut onClick={toggleDrawer('left', true)}>
					<MenuIcon />
				</NiceBut>
				<Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)}>
					{list('left')}
				</Drawer>
			</React.Fragment>
		</div>
	)
}

export default MenuShow
