import { FC } from 'react'

interface IHeartComp {
	clasno: string
	click: () => void
	styleCl: React.CSSProperties
}

const HeartButton: FC<IHeartComp> = ({ clasno, click, styleCl }) => {
	//кнопка "добавить в избранное"

	return (
		<button className={clasno} onClick={click} style={styleCl}>
			&#10084;
		</button>
	)
}

export default HeartButton
