const _ = require('lodash');


const dummy = (blogs) => {
    // ...
    return 1; 
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
  };
  
  
  const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
      return null; // Si la lista está vacía, retornamos null
    }
  
    const favorite = blogs.reduce((prev, current) => {
      return (current.likes > prev.likes) ? current : prev;
    });
  
    // Devolvemos solo las propiedades solicitadas
    return {
      title: favorite.title,
      author: favorite.author,
      likes: favorite.likes
    };
  }
  
 
  
  // Nueva función mostBlogs
  const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return null;
    }
  
    // Agrupamos los blogs por autor
    const authorCounts = _.countBy(blogs, 'author');
    
    // Encontramos el autor con más blogs
    const maxBlogsAuthor = Object.keys(authorCounts).reduce((prev, curr) => {
      return authorCounts[curr] > authorCounts[prev] ? curr : prev;
    });
  
    // Devolvemos el autor con el número de blogs
    return {
      author: maxBlogsAuthor,
      blogs: authorCounts[maxBlogsAuthor]
    };
  }
  
  
  const mostLikes = (blogs) => {
    if (blogs.length === 0) return null; // Retorna null si no hay blogs
  
    const authorLikes = {};
  
    // Contar los likes por autor
    blogs.forEach((blog) => {
      if (authorLikes[blog.author]) {
        authorLikes[blog.author] += blog.likes; // Sumar likes al autor existente
      } else {
        authorLikes[blog.author] = blog.likes; // Inicializar likes para un nuevo autor
      }
    });
  
    // Determinar el autor con más likes
    let mostLikesAuthor = null;
    let maxLikes = 0;
  
    for (const [author, likes] of Object.entries(authorLikes)) {
      if (likes > maxLikes) {
        maxLikes = likes;
        mostLikesAuthor = author;
      }
    }
  
    return {
      author: mostLikesAuthor,
      likes: maxLikes,
    };
  };
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes, // Exportar la nueva función
  };
  
  
  