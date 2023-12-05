import { useEffect, useState } from 'react'

//форма для вывода времени

function Timenow() {
	const [time, setTime] = useState(new Date())

	useEffect(() => {
		const interval = setInterval(() => {
			setTime(new Date())
		}, 1000)

		return () => clearInterval(interval)
	}, [])

	const hours = time.getHours()
	const minutes = time.getMinutes()
	const seconds = time.getSeconds()

	const timeString = `${hours}:${minutes}:${seconds}`

	return (
		<>
			<span>{timeString}</span>
		</>
	)
}

export default Timenow
