import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/blogs'
//Ahora llamaresmos a los APIs de NODE
//const baseUrl = 'http://localhost:3001/api/blogs'//LOCALHOST API NodeExpress
//const baseUrl = '/api/blogs' //DESARROLLO

let token = null

const setToken = newToken => {
  token = `Bearer ${newToken}`
}


const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }
{/*CREATE BLOG*/}
const create = async newObject => {
    console.log('serviceCREATEBLOGFRONT')
    const config = {
      headers: { Authorization: token },
    }
    console.log('serviceBlog FRONT', baseUrl)
    console.log('serviceBlog FRONT', newObject)
    console.log('serviceBlog FRONT', config)

    const response = await axios.post(baseUrl, newObject, config)
    console.log('serviceCREATEBLOGFRONT response',response.data)
    return response.data
  }

  const remove = async (id) => {
    
    const config = {
      headers: { Authorization: token }
    }
    console.log('serviceBlog FRONT delete ', baseUrl)
    console.log('serviceBlog FRONT delete', config)
    console.log('serviceBlog FRONT delete id', id)
    const response = axios.delete(`${baseUrl}/${id}`, config)
    return response.data 
  }
  
  
  
  {/*UPDATE BLOG*/}
  const update = (id, newObject) => {
    console.log('serviceUPDATEBLOGFRONT')
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    console.log('serviceUPDATEBLOGFRONT response',request.data)
    return request.then(response => response.data)
  }
  
  export default { 
    getAll: getAll, 
    create: create, 
    update: update ,
    remove: remove,
    setToken : setToken 
  }