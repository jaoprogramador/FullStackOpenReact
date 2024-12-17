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
  
  const create = async newObject => {
    const config = {
      headers: { Authorization: token },
    }
    console.log('serviceBlog FRONT', baseUrl)
    console.log('serviceBlog FRONT', newObject)
    console.log('serviceBlog FRONT', config)
    const response = await axios.post(baseUrl, newObject, config)
    return response.data
  }
  
  
  const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
  }
  const remove = async (id) => {
    console.log('Service blog remove',id)
    const config = {
      headers: { Authorization: token },
    }
    console.log('Service blog remove config',config)
    const request = axios.delete(`${baseUrl}/${id}`, config)
    console.log('Service blog res ',(await request).data)
    return request.then(response => response.data)
  }
  const like = async (id) => {
    console.log('Service blog like',id)
    console.log('Service blog like',`${baseUrl}/${id}/like`)
    const response = await axios.put(`${baseUrl}/${id}/like`);
    return response.data;
  };
  
  const getById = async (id) => {
    try{
      console.log('BLOG SERVICE getById ',`${baseUrl}/${id}`)
      const response = await axios.get(`${baseUrl}/${id}`);
      console.log('BLOG SERVICE getById response.data ',response.data);
      return response.data;
    } catch (error) {
      console.error("Error en getById:", error.message); // Muestra el error en consola
      throw error; // Para que el error pueda ser manejado en el componente BlogView
    }
  };
  
  const addComment = async (id, comment) => {
    const response = await axios.post(`${baseUrl}/${id}/comments`, comment);
    return response.data;
  };
  
  
  
  export default { 
    getAll: getAll, 
    create: create, 
    update: update ,
    remove: remove ,
    like: like, 
    setToken : setToken,
    getById : getById, 
    addComment : addComment
  }