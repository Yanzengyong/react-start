import React, { Component } from 'react'
import styles from './index.scss'
import Icon from '../../components/IconComponent'
import Schema from 'async-validator'
import { Link } from 'react-router-dom'
import Toast from '../../components/Toast'
import Loading from '../../components/Loading'

const schema = new Schema({
	username: [{
		type: 'string',
		required: true,
		message: '请输入用户名'
	}, {
		min: 5,
		max: 10,
		message: '用户名长度为5-10个字符'
	}],
	password: [{
		type: 'string',
		required: true,
		message: '请输入密码'
	}, {
		min: 6,
		max: 20,
		message: '用户名长度为6-20个字符'
	}]
})
class Login extends Component {
  state = {
  	pwdType: 'password',
  	password: '',
  	username: '',
  	usernameError: '',
  	passwordError: '',
  	toastType: '',
  	toastText: '',
  	toastShow: false,
  	isLoading: false,
  	checked: false
  }
  componentDidMount () {
  	Toast(true, 'success', 'hahha')
  }
  getPassword = (e) => {
  	this.setState({
  		password: e.target.value
  	})
  }
  getUsername = (e) => {
  	this.setState({
  		username: e.target.value
  	})
  }
  getCheckBox = (e) => {
  	this.setState({
  		checked: e.target.checked
  	})
  }
  changePwdType = () => {
  	this.state.pwdType === 'password' ?
  		this.setState({
  			pwdType: 'text'
  		}) : this.setState({
  			pwdType: 'password'
  		})
  }
  closeFn = (which) => {
  	which === 'password' ?
  		this.setState({
  			password: ''
  		}) : this.setState({
  			username: ''
  		})
  }
  toastSuccessFn = (text, delay, callback) => {
  	this.setState({
  		toastShow: true,
  		toastText: text,
  		toastType: 'success',
  		isLoading: false
  	}, () => {
  		setTimeout(() => {
  			this.setState({
  				toastShow: false,
  			}, () => {
  				callback()
  			})
  		}, delay)
  	})
  }
  toastfailedFn = (text, delay, callback) => {
  	this.setState({
  		toastShow: true,
  		toastText: text,
  		toastType: 'error',
  		isLoading: false
  	}, () => {
  		setTimeout(() => {
  			this.setState({
  				toastShow: false,
  			}, () => {
  				callback()
  			})
  		}, delay)
  	})
  }
  loginFn = () => {
  	// const params = {
  	// 	password: this.state.password,
  	// 	username: this.state.username,
  	// 	checked: this.state.checked
  	// }
  	setTimeout(() => {
  		this.toastSuccessFn('登录成功', 2000, () => {
  			this.props.history.push('/list')
  		})
  	}, 3000)
  }
  validateSuccessFn = () => {
  	this.setState({
  		passwordError: '',
  		usernameError: '',
  		isLoading: true
  	})
  	this.loginFn()
  }
  submitBtn = () => {
  	schema.validate({
  		username: this.state.username,
  		password: this.state.password
  	}, (errors, filed) => {
  		if (errors) {
  			console.log(filed)
  			if (filed.username) {
  				this.setState({
  					usernameError: filed.username[0].message
  				})
  			}
  			if (filed.password) {
  				this.setState({
  					passwordError: filed.password[0].message
  				})
  			}
  			return
  		}
  		// 执行通过验证的后的请求等
  		this.validateSuccessFn()
  	})
  }
  render () {
  	return (
  		<div className={styles.login_container}>
  			<Toast
  				type={this.state.toastType}
  				text={this.state.toastText}
  				show={this.state.toastShow}/>
  			<Loading isShow={this.state.isLoading}/>
  			<div className={styles.login_context_box}>
  				<div className={styles.title_box}>
  					<div className={styles.title_logo}></div>
  					<div className={styles.title_text}>中电科大数据院应用平台</div>
  				</div>
  				<div className={styles.form_box}>
  					<div className={styles.form_title}>用户登录</div>
  					<form className={styles.login_box}>
  						<div className={styles.input}>
  							<Icon icon='username' style={{ width: '23px', height: '23px' }}/>
  							<input
  								onChange={this.getUsername}
  								value={this.state.username}
  								type="text"
  								placeholder='请输入用户名' />
  							{this.state.username === '' ? null : <Icon onClick={() => { this.closeFn('username') }} icon='close' className={styles.icon_close}/>}
  						</div>
  						<div className={styles.error_box}>{this.state.usernameError}</div>
  						<div className={styles.input} style={{ marginTop: '18px' }}>
  							<Icon icon='password' style={{ width: '23px', height: '23px' }}/>
  							<input
  								onChange={this.getPassword}
  								value={this.state.password}
  								type={this.state.pwdType}
  								placeholder='请输入密码' />
  							{this.state.password === '' ? null : <Icon onClick={() => { this.closeFn('password') }} icon='close' className={styles.icon_close}/>}
  							<Icon onClick={this.changePwdType} icon={this.state.pwdType === 'password' ? 'check_show' : 'check_hide'} className={styles.icon_check}/>
  						</div>
  						<div className={styles.error_box}>{this.state.passwordError}</div>
  						<div className={styles.password_box}>
  							<div className={styles.remember_box}>
  								<input
  									type="checkbox"
  									checked={this.state.checked}
  									value={this.state.checked}
  									onClick={this.getCheckBox} />
  								<span>记住我一周</span>
  							</div>
  							<div className={styles.forget}>忘记密码？</div>
  						</div>
  						<div onClick={this.submitBtn} className={styles.button}>登录</div>
  					</form>
  				</div>
  			</div>
  			<div className={styles.buttom_box}>
  				<div className={styles.buttom_link}>
  					<Link to='/aa' className={styles.link}>官方网站</Link>
  					<div className={styles.line}></div>
  					<Link to='/' className={styles.link}>隐私</Link>
  					<div className={styles.line}></div>
  					<Link to='/' className={styles.link}>条款</Link>
  					<div className={styles.line}></div>
  					<Link to='/' className={styles.link}>关于我们</Link>
  					<div className={styles.line}></div>
  					<Link to='/' className={styles.link}>帮助与支持</Link>
  				</div>
  				<div className={styles.copyright}>
          Copyright ©️ 中电科大数据研究院有限公司
  				</div>
  				<div className={styles.record}>
  					<img src={require('../../static/images/recode.png')} />
  					<span>贵公网安备 0000000000号</span>
  				</div>
  			</div>
  		</div>
  	)
  }
}

export default Login
