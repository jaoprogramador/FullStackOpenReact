const average = (blogs) => {
    if (blogs.length === 0) {
      return 0; // Devuelve 0 para un array vacío
    }
    const sum = blogs.reduce((acc, blog) => acc + blog.likes, 0); // Suponiendo que cada blog tiene una propiedad 'likes'
    return sum / blogs.length; // Calcula el promedio
  };
  
  module.exports = {
    average,
  };
  