const dummy = (blogs) => {
    // ...
    return 1; 
  }
  
  const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0);
  };
  
  
  
  // Nueva función favoriteBlog
const favoriteBlog = (blogs) => {
    if (blogs.length === 0) return null; // Retorna null si no hay blogs
  
    return blogs.reduce((prev, current) => {
      return (prev.likes > current.likes) ? prev : current;
    });
  };
  
  // Nueva función mostBlogs
const mostBlogs = (blogs) => {
    if (blogs.length === 0) return null; // Retorna null si no hay blogs
  
    const authorCount = {};
  
    // Contar la cantidad de blogs por autor
    blogs.forEach((blog) => {
      if (authorCount[blog.author]) {
        authorCount[blog.author]++;
      } else {
        authorCount[blog.author] = 1;
      }
    });
  
    // Determinar el autor con más blogs
    let mostBlogsAuthor = null;
    let maxBlogs = 0;
  
    for (const [author, count] of Object.entries(authorCount)) {
      if (count > maxBlogs) {
        maxBlogs = count;
        mostBlogsAuthor = author;
      }
    }
  
    return {
      author: mostBlogsAuthor,
      blogs: maxBlogs,
    };
  };
  
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
  
  
  