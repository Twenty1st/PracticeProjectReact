import styles from './But.module.css'

const BiutifulBut = () => {
	return (
		<div className={styles.container}>
			<div className={styles.center}>
				<button className={styles.btn}>
					<svg
						width='180px'
						height='60px'
						viewBox='0 0 180 60'
						className={styles.border}
					>
						<polyline
							points='179,1 179,59 1,59 1,1 179,1'
							className={styles.bg_line}
						/>
						<polyline
							points='179,1 179,59 1,59 1,1 179,1'
							className={styles.hl_line}
						/>
					</svg>
					<span>HOVER ME</span>
				</button>
			</div>
		</div>
	)
}

export default BiutifulBut
