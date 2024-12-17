import React from 'react';
import { render, fireEvent, waitFor, act } from '@testing-library/react-native'; // O '@testing-library/react' para aplicaciones web
import SignInContainer from 'src\components\SignIn';

describe('SignIn', () => {
  describe('SignInContainer', () => {
    it('calls onSubmit function with correct arguments when a valid form is submitted', async () => {
      // Creamos una función simulada para verificar el llamado a onSubmit
      const onSubmitMock = jest.fn();

      // Renderizamos el componente SignInContainer
      const { getByPlaceholderText, getByText } = render(
        <SignInContainer onSubmit={onSubmitMock} />
      );

      // Seleccionamos los inputs y el botón de envío
      const usernameInput = getByPlaceholderText('Username');
      const passwordInput = getByPlaceholderText('Password');
      const submitButton = getByText('Sign in');

      // Llenamos los inputs usando fireEvent
      await act(async () => {
        fireEvent.changeText(usernameInput, 'testuser');
        fireEvent.changeText(passwordInput, 'password123');
      });

      // Simulamos el envío del formulario
      await act(async () => {
        fireEvent.press(submitButton);
      });

      // Esperamos que se haya llamado la función onSubmit con los argumentos correctos
      await waitFor(() => {
        expect(onSubmitMock).toHaveBeenCalledTimes(1);
        expect(onSubmitMock).toHaveBeenCalledWith({
          username: 'testuser',
          password: 'password123',
        });
      });
    });
  });
});
