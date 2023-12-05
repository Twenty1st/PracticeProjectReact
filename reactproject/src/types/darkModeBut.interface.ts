import { Theme } from '@mui/material/styles'

export interface iCatalog {
	darkMode: boolean
	myTheme: Theme
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}
