//работа с данными

import { ICarData } from '../types/cars.interface'
import { FetchgetById, addData, countData, deleteData, fetchgetData } from './fetchQuery'
// const cars = [
// 	{ id: '1', name: 'BMW m1', price: '500000', img: '/car1.jpeg' },
// 	{ id: '2', name: 'BMW z1', price: '100000', img: '/car2.jpg' },
// 	{ id: '3', name: 'BMW f1', price: '300000', img: '/car3.jpg' },
// ]

// interface iFetch {
// 	query: string
// 	id?: string
// }

// const fetchgetData = async ({ query }: { query: string }) => {
// 	try {
// 		const response = await fetch(
// 			`http://localhost:3001/api/Getitems?query=${encodeURIComponent(query)}`
// 		)
// 		const result = await response.json()
// 		return result
// 	} catch (error) {
// 		console.error('Error fetching data:', error)
// 	}
// }

// const FetchgetById = async ({ id }: { id: string }) => {
// 	try {
// 		const response = await fetch(`http://localhost:3001/api/Getitem?id=${id}`)
// 		const result = await response.json()
// 		return result
// 	} catch (error) {
// 		console.error('Error fetching data:', error)
// 	}
// }

// const countData = async () => {
// 	try {
// 		const response = await fetch(`http://localhost:3001/api/Countitems`)
// 		const result = await response.json()
// 		return result
// 	} catch (error) {
// 		console.error('Error fetching data:', error)
// 	}
// }

// const addData = async ({ newData }: { newData: ICarData }) => {
// 	try {
// 		const response = await fetch(`http://localhost:3001/api/Additem`, {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(newData),
// 		})

// 		const result = await response.json()
// 		return true
// 	} catch (error) {
// 		console.error('Ошибка запроса:', error)
// 		return false
// 	}
// }

// const deleteData = async ({ id }: { id: string }) => {
// 	try {
// 		const response = await fetch(`http://localhost:3001/api/DeleteItem?id=${id}`, {
// 			method: 'DELETE',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 		})
// 		const result = await response.json()
// 		return true
// 	} catch (error) {
// 		console.error('Error deleting data:', error)
// 		return false
// 	}
// }

interface IuserData {
	name: string
	lname: string
	login: string
	pwd: string
}

const RegisterUser = async ({ userData }: { userData: IuserData }) => {
	try {
		const response = await fetch('http://localhost:3001/registration', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ userData }),
		})

		if (!response.ok) {
			throw new Error('Registration failed')
		}

		const data = await response.json()
		if (data.error) {
			console.log('Registration error:', data.error)
			return false
		}

		// Возвращаем успешный результат
		return true
	} catch (error) {
		console.error('Registration error:', error)
		return false
	}
}

const CheckAuthUser = async ({ login, pwd }: { login: string; pwd: string }) => {
	try {
		const response = await fetch('http://localhost:3001/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ login, pwd }),
		})

		if (!response.ok) {
			throw new Error('Authentication failed')
		}

		const data = await response.json()
		if (data === false) {
			console.log('Authentication error:', response)
			return false
		}
		const token = data.token // Полученный токен от сервера

		// Сохраните токен в localStorage или в состоянии вашего приложения
		localStorage.setItem('authToken', token)
		return true
	} catch (error) {
		console.error('Authentication Myerror:', error)
		return false
	}
}

export const CarService = {
	getAll(query: string) {
		const cars = fetchgetData({ query: query })

		return cars
	},

	getById(id: string) {
		const car = FetchgetById({ id: `${id}` })
		return car
	},
	countAll() {
		const count = countData()

		return count
	},

	addCar(carData: ICarData) {
		const checkAdd = addData({ newData: carData })

		return checkAdd
	},

	async deleteCar(id: string) {
		const check = await deleteData({ id: id })
		if (check) {
			return true
		} else {
			return false
		}
	},

	checkAuth({ login, pwd }: { login: string; pwd: string }) {
		const check = CheckAuthUser({ login: login, pwd: pwd })

		return check
	},

	registrationUser({ userData }: { userData: IuserData }) {
		const check = RegisterUser({ userData })
		return check
	},
}
