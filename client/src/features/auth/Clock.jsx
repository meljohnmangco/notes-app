

import { useState, useEffect } from 'react'

const Clock = () => {

	const [date, setDate] = useState(new Date())

	useEffect(() => {
		const interval = setInterval(() => {
			setDate(new Date())
		}, 1000)
		return () => clearInterval(interval)
	}, [])

	const formattedDate = Intl.DateTimeFormat('en-US', { dateStyle: 'full', timeStyle: 'long' }).format(date);


	return formattedDate
}

export default Clock