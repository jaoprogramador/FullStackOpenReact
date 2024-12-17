import axios from 'axios'
const baseUrl = 'http://localhost:3003/api/users'
//Ahora llamaresmos a los APIs de NODE
//const baseUrl = 'http://localhost:3001/api/blogs'//LOCALHOST API NodeExpress
//const baseUrl = '/api/blogs' //DESARROLLO

let token = null

const setToken = newToken => {
token = `Bearer ${newToken}`
}


  const getAll = async() => {
    console.log('USER SERVICE FRONT')
    //const request = axios.get(baseUrl)

    
    //return request.then(response => response.data)
    const response = await axios.get(baseUrl)
    console.log('USER SERVICE FRONT',response.data)
    return response.data
  }
  
  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }
    console.log('serviceUser FRONT', baseUrl)
    console.log('serviceUser FRONT', newObject)
    console.log('serviceUser FRONT', config)
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }
  
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }
  const remove = async (id) => {
    console.log('Service USER remove',id)
    const config = {
      headers: { Authorization: token },
    }
    console.log('Service USER remove config',config)
    const request = axios.delete(`${baseUrl}/${id}`, config)
    console.log('Service blog res ',(await request).data)
    return request.then(response => response.data)
  }

  const getUserById = async (id) => {
    console.log('Service USER getUserById', id);
    const config = {
      headers: { Authorization: token }
    };
    try {
      const response = await axios.get(`${baseUrl}/${id}`, config);
      console.log('Service USER getUserById response.data ', response.data);
      return response.data;
    } catch (error) {
      console.error("Service USER getUserById:", error.message);
      throw error;
    }
  };
  
  
  export default { 
    getAll: getAll, 
    create: create, 
    update: update ,
    remove: remove ,
    getUserById: getUserById,
    setToken : setToken 
  }