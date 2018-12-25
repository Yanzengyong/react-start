import React from 'react'
import styles from './index.scss'

const Loading = ({ isShow }) => {
	return (
		<div>
			{
				isShow ? (
					<div className={styles.loading_container}>
						<div className={styles.spinner}>
							<div className={styles.rect1}></div>
							<div className={styles.rect2}></div>
							<div className={styles.rect3}></div>
							<div className={styles.rect4}></div>
							<div className={styles.rect5}></div>
						</div>
					</div>
				) : null
			}
		</div>
	)
}

export default Loading
