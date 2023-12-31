import { ICarData } from '../types/cars.interface'

export const host = '158.160.133.46:3001'

export const fetchgetData = async ({ query }: { query: string }) => {
	try {
		const response = await fetch(`http://${host}/api/Getitems?query=${encodeURIComponent(query)}`)
		const result = await response.json()
		return result
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}

export const FetchgetById = async ({ id }: { id: string }) => {
	try {
		const response = await fetch(`http://${host}/api/Getitem?id=${id}`)
		const result = await response.json()
		return result
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}

export const countData = async () => {
	try {
		const response = await fetch(`http://${host}/api/Countitems`)
		const result = await response.json()
		return result
	} catch (error) {
		console.error('Error fetching data:', error)
	}
}

export const addData = async ({ newData }: { newData: ICarData }) => {
	try {
		const response = await fetch(`http://${host}/api/Additem`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newData),
		})

		const result = await response.json()
		return true
	} catch (error) {
		console.error('Ошибка запроса:', error)
		return false
	}
}

export const deleteData = async ({ id }: { id: string }) => {
	try {
		const response = await fetch(`http://${host}/api/DeleteItem?id=${id}`, {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json',
			},
		})
		const result = await response.json()
		return true
	} catch (error) {
		console.error('Error deleting data:', error)
		return false
	}
}
