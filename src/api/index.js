import { mergyApi } from 'utils'

const HOST = ''

const CLOUDMONITORUSER = ''

//登陆
const login = mergyApi({
	get: '/weatherApi?city=贵阳'
}, CLOUDMONITORUSER)

const API = mergyApi({
	login
}, HOST)

export default API
