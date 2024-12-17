import { render, screen } from '@testing-library/react';
import Blog from './Blog';

describe('<Blog />', () => {
  test('muestra el título y el autor, pero no la URL ni el número de likes', () => {
    const blog = {
      title: 'Título del blog',
      author: 'Autor del blog',
      url: 'http://ejemplo.com',
      likes: 10,
    };

    render(<Blog blog={blog} />);

    // Verifica que el título y el autor se muestren
    expect(screen.getByText('Título del blog')).toBeInTheDocument();
    expect(screen.getByText('Autor del blog')).toBeInTheDocument();

    // Verifica que la URL y el número de likes no se muestren
    const urlElement = screen.queryByText('http://ejemplo.com');
    const likesElement = screen.queryByText('10 likes');

    expect(urlElement).not.toBeInTheDocument();
    expect(likesElement).not.toBeInTheDocument();
  });
  describe('<Blog />', () => {
    const blog = {
      title: 'Título del blog',
      author: 'Autor del blog',
      url: 'http://ejemplo.com',
      likes: 10,
    };
  
    test('muestra el título y el autor, y muestra la URL y el número de likes al hacer clic en el botón', () => {
      render(<Blog blog={blog} />);
  
      // Verifica que el título y el autor se muestren
      expect(screen.getByText('Título del blog')).toBeInTheDocument();
      expect(screen.getByText('Autor del blog')).toBeInTheDocument();
  
      // Verifica que la URL y el número de likes no se muestren al inicio
      expect(screen.queryByText('http://ejemplo.com')).not.toBeInTheDocument();
      expect(screen.queryByText('10 likes')).not.toBeInTheDocument();
  
      // Haz clic en el botón para mostrar detalles
      const button = screen.getByText('Mostrar detalles');
      fireEvent.click(button);
  
      // Verifica que la URL y el número de likes ahora se muestren
      expect(screen.getByText('http://ejemplo.com')).toBeInTheDocument();
      expect(screen.getByText('10 likes')).toBeInTheDocument();
  
      // Haz clic en el botón para ocultar detalles
      fireEvent.click(button);
  
      // Verifica que la URL y el número de likes no se muestren después de ocultar
      expect(screen.queryByText('http://ejemplo.com')).not.toBeInTheDocument();
      expect(screen.queryByText('10 likes')).not.toBeInTheDocument();
    });
  
});
