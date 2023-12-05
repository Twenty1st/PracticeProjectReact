import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Checkbox from '@mui/material/Checkbox'
import Container from '@mui/material/Container'
import CssBaseline from '@mui/material/CssBaseline'
import FormControlLabel from '@mui/material/FormControlLabel'
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import * as React from 'react'
import { CarService } from '../../CarService/car.service'

function Copyright(props: any) {
	return (
		<Typography variant='body2' color='text.secondary' align='center' {...props}>
			{'Copyright © '}
			{/* <Link color='inherit' href='https://mui.com/'>
				Your Website
			</Link>{' '} */}
			{new Date().getFullYear()}
			{'.'}
		</Typography>
	)
}

const checkAuth = async ({ login, pwd }: { login: string; pwd: string }) => {
	const check = await CarService.checkAuth({ login, pwd })
	return check
}

const AuthorizationForm = () => {
	const [data, setData] = React.useState({
		login: '',
		pwd: '',
	})

	const [LoginError, setLoginError] = React.useState(true)
	const [PWDError, setPWDError] = React.useState(true)

	const SingClick = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault()
		if (data.login === '') {
			setLoginError(false)
		}
		if (data.pwd === '') {
			setPWDError(false)
			console.log(data.pwd)
		}
		if (data.login && data.pwd) {
			setLoginError(true)
			setPWDError(true)
			const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
			const isValid = emailRegex.test(data.login)
			if (!isValid) {
				setLoginError(false)
			} else {
				const check = await checkAuth({ login: data.login, pwd: data.pwd })
				if (check) {
					window.location.replace('/catalog')
				} else {
					alert('Unknow login or pwd')
				}
			}
		}
	}

	return (
		<>
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
						Sign in
					</Typography>
					<Box component='form' noValidate sx={{ mt: 1 }}>
						<TextField
							margin='normal'
							required
							fullWidth
							id='email'
							label='Email Address'
							name='email'
							autoComplete='email'
							autoFocus
							onChange={e =>
								setData(prev => ({
									...prev,
									login: e.target.value,
								}))
							}
							error={!LoginError}
							helperText={!LoginError ? 'Invalid email address' : ''}
						/>
						<TextField
							margin='normal'
							required
							fullWidth
							name='password'
							label='Password'
							type='password'
							id='password'
							autoComplete='current-password'
							error={!PWDError}
							helperText={!PWDError ? 'Field is empty' : ''}
							onChange={e =>
								setData(prev => ({
									...prev,
									pwd: e.target.value,
								}))
							}
						/>
						<FormControlLabel
							control={<Checkbox value='remember' color='primary' />}
							label='Remember me'
						/>
						{/* component={Link} to='/' */}
						<Button variant='contained' color='primary' onClick={e => SingClick(e)}>
							Sign in
						</Button>
						<Grid container>
							<Grid item xs>
								{/* <Link href='#' variant='body2'>
									Forgot password?
								</Link> */}
							</Grid>
							<Grid item>
								<Link href='/registration' variant='body2'>
									{"Don't have an account? Sign Up"}
								</Link>
							</Grid>
						</Grid>
					</Box>
				</Box>
				<Copyright sx={{ mt: 8, mb: 4 }} />
			</Container>
		</>
	)
}

export default AuthorizationForm
