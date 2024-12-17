import axios from 'axios'
//const baseUrl = '/api/login' //DESARROLLO
const baseUrl = 'http://localhost:3003/api/login'

const login = async credentials => {
  console.log('servicesLoginFRONT:::login')
  const response = await axios.post(baseUrl, credentials)
  console.log('servicesLoginFRONT:::response',response)
  return response.data
}

export default { login }