const HOST = 'http://192.168.1.109:11400'

const proxy = {
	// 代理配置
	'/': {
		target: HOST,
		secure: false,
		changeOrigin: true
	}
}



// merge本地配置和线上配置
let config = {}

try {
	let localConfig = require('./localProxy')
	if(localConfig.disabled)
	{
		config = proxy
	}else{
		const localProxy = JSON.parse(JSON.stringify(localConfig))
		delete localProxy.disabled
		config = mergeConfig(localProxy, proxy)
	}
}catch(e) {
	config = proxy
}

function mergeConfig (...configs) {
	let list = []
	const result = {}
	for(let i = 0;i < configs.length;i++)
	{
		const item = configs[i]
		list = list.concat((Object.keys(item) || []).map(d => ({
			[d]: item[d]
		})))
	}
	return list.reduce((total, current) => {
		const keys = Object.keys(current)
		keys.forEach((item) => {
			if(!total[item])
			{
				total[item] = current[item]
			}
		})
		return total
	})
}

module.exports = config
