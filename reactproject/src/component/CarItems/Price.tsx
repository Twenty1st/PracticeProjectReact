import React, { FC } from 'react'

//конвертация цены

const Price: FC<{ price: number }> = ({ price }) => {
	return (
		<>
			{new Intl.NumberFormat('en-US', {
				style: 'currency',
				currency: 'USD',
			}).format(price)}
		</>
	)
}

export default React.memo(Price)
