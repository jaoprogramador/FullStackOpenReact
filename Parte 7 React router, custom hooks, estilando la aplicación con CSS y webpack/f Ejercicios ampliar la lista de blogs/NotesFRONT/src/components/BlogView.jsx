import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import blogService from '../services/blogs';

const BlogView = () => {
    const [blog, setBlog] = useState(null);
    const [newComment, setNewComment] = useState('');
    const { id } = useParams();
  
    useEffect(() => {
      const fetchBlog = async () => {
        const fetchedBlog = await blogService.getById(id);
        setBlog(fetchedBlog);
      };
      fetchBlog();
    }, [id]);
  
    const handleCommentSubmit = async (event) => {
      event.preventDefault();
      const updatedBlog = await blogService.addComment(id, { comment: newComment });
      setBlog(updatedBlog);
      setNewComment(''); // Limpia el campo de comentario
    };
  

  if (!blog) return <p>Loading blog view...</p>;

  return (
    <div>
       <h2>{blog.title} by {blog.author}</h2>
      <p><a href={blog.url}>{blog.url}</a></p>
      <p>{blog.likes} likes</p>
      <p>added by {blog.user && blog.user.name}</p>

      <h3>comments</h3>
      <ul>
        {blog.comments.map((comment, index) => (
          <li key={index}>{comment}</li>
        ))}
      </ul>

      <form onSubmit={handleCommentSubmit}>
        <input
          type="text"
          value={newComment}
          onChange={({ target }) => setNewComment(target.value)}
        />
        <button type="submit">add comment</button>
      </form>
    </div>
  );
};

export default BlogView;
