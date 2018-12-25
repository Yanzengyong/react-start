import React from 'react'
import Icon from '../../components/IconComponent'
import styles from './index.scss'

class MenuList extends React.Component {
  linkBtn = (item) => {
  	console.log(item)
  	alert(`跳转到${item.text}链接`)
  }
  render () {
  	const iconItmes = [
  		{ text: 'icon_1' },
  		{ text: 'icon_2' },
  		{ text: 'icon_3' },
  		{ text: 'icon_4' },
  		{ text: 'icon_5' },
  	]
  	return (
  		<div className={styles.list_container}>
  			<div className={styles.icon_box}>
  				{
  					iconItmes.map((item, index) => {
  						return (
  							<div
  								key={index}
  								className={styles.icon_child}>
  								<div
  									onClick={this.linkBtn.bind(this, item)}
  									className={styles.icon_Link}>
  									<Icon icon='username' className={styles.icon_style}/>
  									<span>{item.text}</span>
  								</div>
  							</div>
  						)
  					})
  				}
  			</div>
  		</div>
  	)
  }
}

export default MenuList
