import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import Toolbar from '@mui/material/Toolbar'
import { ChangeEvent } from 'react'
import styles from './SearchBar.module.css'

type ChangeHandler = (e: ChangeEvent<HTMLInputElement>) => void

export default function SearchBar({ change }: { change: ChangeHandler }) {
	return (
		<div className={styles.grow}>
			<Toolbar>
				<div className={styles.search}>
					<div className={styles.searchIcon}>
						<SearchIcon />
					</div>
					<InputBase
						sx={{
							padding: '2px 50px;',
							color: 'white',
						}}
						placeholder='Search…'
						classes={{
							root: styles.inputRoot,
							input: styles.inputInput,
						}}
						inputProps={{ 'aria-label': 'search' }}
						onChange={change}
					/>
				</div>
				<div className={styles.grow} />
			</Toolbar>
		</div>
	)
}
