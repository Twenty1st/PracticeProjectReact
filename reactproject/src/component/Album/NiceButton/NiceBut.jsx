import style from './NiceBut.module.css'
const NiceBut = ({ children, onClick }) => {
	const classes = style.btn + ' ' + style.btn_white + ' ' + style.btn_animate
	return (
		<div className={style.text_box}>
			<button className={classes} onClick={onClick}>
				{children}
			</button>
		</div>
	)
}

export default NiceBut
