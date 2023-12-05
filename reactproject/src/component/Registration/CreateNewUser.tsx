import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { CarService } from '../../CarService/car.service'

function Copyright(props: any) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			<Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{' '}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme()

type TuserData = {
	name: string
	lname: string
	login: string
	pwd: string
}

const RegistrationUser = async (data: TuserData) => {
	const check = await CarService.registrationUser({ userData: data })
	if (check) {
		window.location.replace('/')
		return
	}
	alert('Error')
}

const Registration = () => {
	// const [data, setData] = React.useState({
	// 	login: '',
	// 	pwd: '',
	// })
	const [LoginError, setLoginError] = React.useState(true)
	const [PWDError, setPWDError] = React.useState(true)
	const [NameError, setNameError] = React.useState(true)
	const [LNameError, setLNameError] = React.useState(true)

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()
		const data = new FormData(event.currentTarget)

		const userData = {
			name: data.get('firstName'),
			Lname: data.get('lastName'),
			login: data.get('email'),
			pwd: data.get('password'),
		}

		setNameError(!!userData.name)
		setLNameError(!!userData.Lname)
		setLoginError(!!userData.login)
		setPWDError(!!userData.pwd)

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
		const checkEmail = userData.login !== null ? userData.login : ''
		if (checkEmail !== '') {
			const isValid = emailRegex.test(checkEmail.toString())
			console.log(isValid)
			if (!isValid) {
				setLoginError(false)
				return
			}
		}

		if (userData.name && userData.Lname && userData.login && userData.pwd) {
			const currentData = {
				name: userData.name.toString(),
				lname: userData.Lname.toString(),
				login: userData.login.toString(),
				pwd: userData.pwd.toString(),
			}
			RegistrationUser(currentData)
		}
	}

	return (
		<ThemeProvider theme={defaultTheme}>
			<Container component='main' maxWidth='xs'>
				<CssBaseline />
				<Box
					sx={{
						marginTop: 8,
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
					}}
				>
					<Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
						<LockOutlinedIcon />
					</Avatar>
					<Typography component='h1' variant='h5'>
						Sign up
					</Typography>
					<Box component='form' noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
						<Grid container spacing={2}>
							<Grid item xs={12} sm={6}>
								<TextField
									autoComplete='given-name'
									name='firstName'
									required
									fullWidth
									id='firstName'
									label='First Name'
									autoFocus
									error={!NameError}
								/>
							</Grid>
							<Grid item xs={12} sm={6}>
								<TextField
									required
									fullWidth
									id='lastName'
									label='Last Name'
									name='lastName'
									autoComplete='family-name'
									error={!LNameError}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									id='email'
									label='Email Address'
									name='email'
									autoComplete='email'
									error={!LoginError}
									helperText={!LoginError ? 'Empru field or Invalid email address' : ''}
								/>
							</Grid>
							<Grid item xs={12}>
								<TextField
									required
									fullWidth
									name='password'
									label='Password'
									type='password'
									id='password'
									autoComplete='new-password'
									error={!PWDError}
								/>
							</Grid>
						</Grid>
						<Button type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
							Sign Up
						</Button>
						<Grid container justifyContent='flex-end'>
							<Grid item>
								<Link href='/' variant='body2'>
									Already have an account? Sign in
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 5 }} />
			</Container>
		</ThemeProvider>
	)
}

export default Registration
