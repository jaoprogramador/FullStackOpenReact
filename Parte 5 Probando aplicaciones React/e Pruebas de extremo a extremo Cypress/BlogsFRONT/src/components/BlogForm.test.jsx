import { render, screen, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';
import { vi } from 'vitest';

describe('<BlogForm />', () => {
  test('llama a createBlog con los detalles correctos al crear un nuevo blog', () => {
    const createBlog = vi.fn(); // Crea un mock para la función createBlog
    render(<BlogForm createBlog={createBlog} />); // Renderiza el BlogForm

    // Completa el formulario
    fireEvent.change(screen.getByPlaceholderText('Título'), {
      target: { value: 'Título de prueba' },
    });
    fireEvent.change(screen.getByPlaceholderText('Autor'), {
      target: { value: 'Autor de prueba' },
    });
    fireEvent.change(screen.getByPlaceholderText('URL'), {
      target: { value: 'http://ejemplo.com' },
    });

    // Haz clic en el botón para crear un nuevo blog
    fireEvent.click(screen.getByText('Crear'));

    // Verifica que createBlog fue llamado con los datos correctos
    expect(createBlog).toHaveBeenCalledTimes(1);
    expect(createBlog).toHaveBeenCalledWith({
      title: 'Título de prueba',
      author: 'Autor de prueba',
      url: 'http://ejemplo.com',
    });
  });
});
