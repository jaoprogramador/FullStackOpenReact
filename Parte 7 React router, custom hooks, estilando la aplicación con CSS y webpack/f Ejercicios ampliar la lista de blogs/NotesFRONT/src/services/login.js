import axios from 'axios'
//const baseUrl = '/api/login' //DESARROLLO
const baseUrl = 'http://localhost:3003/api/login'

const login = async credentials => {
  console.log('SERVICE USER FRONT')
  const response = await axios.post(baseUrl, credentials)
  console.log('SERVICE USER FRONT',response.data)
  return response.data
}

export default { login }