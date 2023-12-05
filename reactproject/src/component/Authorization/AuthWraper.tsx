import AuthorizationForm from './AuthorizationForm'

const AuthWrapper = () => {
	const token = localStorage.getItem('authToken')

	// Если пользователь авторизован, отображаем основной компонент
	if (!!token) {
		window.location.replace('/catalog')
		return <></>
	}

	// Иначе отображаем форму авторизации
	return <AuthorizationForm />
}

export default AuthWrapper
