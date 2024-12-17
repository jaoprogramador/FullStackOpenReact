import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native';
//import SignInContainer from '../components/SignInContainer'; // Ajusta la ruta según tu estructura
import SignInContainer from '../components/SignInContainer';
describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // Simulacro de la función onSubmit
      const mockOnSubmit = jest.fn();

      // Renderiza el formulario con el mock
      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={mockOnSubmit} />
      );

      // Localiza los campos de entrada y el botón
      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const submitButton = getByText('Sign In');

      // Rellena los campos de entrada
      await act(async () => {
        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'password123');
      });

      // Simula el envío del formulario
      await act(async () => {
        fireEvent.press(submitButton);
      });

      // Verifica que onSubmit haya sido llamado con los argumentos correctos
      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledTimes(1);
        expect(mockOnSubmit).toHaveBeenCalledWith({
          username: 'testuser',
          password: 'password123',
        });
      });
    });
  });
});
