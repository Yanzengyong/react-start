import React from 'react'
import styles from './index.scss'

const Toast = (props) => {
	const { show, type, text } = props
	return (
		<div className={styles.toast_container}>
			{show ? (
      	<div
					className={styles.toast}
					style={type === 'success' ? { background: '#53b115' } : { background: '#f32d2d' }}>
					{text}
				</div>
			) : null}
		</div>
	)
}

export default Toast
