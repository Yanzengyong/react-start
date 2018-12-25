import React, { Component } from "react"
import style from "./style.scss"
import { NavLink, withRouter } from 'react-router-dom'

class Login extends Component {

  render() {
    const list = [{
      text: '动态请求示例',
      url: '/demo/1'
    }, {
      text: 'd3构建图谱示例',
      url: '/demo/2'
    }];

    return (
      <div className={style.container}>
        {
          list.map((item, index) => (
            <NavLink to={item.url} activeClassName={style.active} key={index}>{item.text}</NavLink>
          ))
        }
      </div>
    )
  }
}

export default withRouter(Login);
