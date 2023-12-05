import { useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider'

//хук для работы с AuthContext

export const useAuth = () => {
	return useContext(AuthContext)
}
