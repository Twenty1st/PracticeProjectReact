import purple from '@mui/material/colors/purple'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
	interface Palette {
		customPrimary: Palette['primary']
		customSecondary: Palette['secondary']
	}
	interface PaletteOptions {
		customPrimary?: PaletteOptions['primary']
		customSecondary?: PaletteOptions['secondary']
		companyBlue?: {
			backgroundColor: string
			color: string
		}
		companyRed?: {
			backgroundColor: string
			color: string
		}
		accent?: {
			backgroundColor: string
			color: string
		}
	}
}

export const customColors = {
	customRed: '#FF5733',
	customGreen: '#33FF57',
	customWhite: '#ffff',
}

export default createTheme({
	palette: {
		primary: {
			// works
			main: '#165788',
			contrastText: '#fff',
		},
		secondary: {
			// works
			main: '#69BE28',
			contrastText: '#fff',
		},
		companyBlue: {
			backgroundColor: '#65CFE9',
			color: '#fff',
		},
		companyRed: {
			backgroundColor: '#E44D69',
			color: '#000',
		},
		accent: {
			backgroundColor: purple[500],
			color: '#000',
		},
	},
})
