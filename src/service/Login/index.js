import resource from 'resource'
import API from 'api'
// import { TOKEN, USER } from 'constants/storage'

class LoginService {
  get = (params) => {
  	return resource.get(API.login.get, params).then((res) => {
  		if(res.code === 200)
  		{
  			return res.data || {}
  		}

  		return null
  	})
  }
}

export default new LoginService()
