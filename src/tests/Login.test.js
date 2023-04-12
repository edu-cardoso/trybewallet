import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import { renderWithRouterAndRedux } from './helpers/renderWith';

describe('Testes do Login', () => {
  it('Testa se a rota / renderiza o componente "Login"', () => {
    const { store } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByTestId('email-input');
    const passwordInput = screen.getByTestId('password-input');
    const button = screen.getByRole('button', {
      name: /entrar/i,
    });

    expect(button).toBeDisabled();

    userEvent.type(emailInput, 'alguem@alguem.com');
    userEvent.type(passwordInput, '111111');
    expect(button).not.toBeDisabled();

    userEvent.click(button);
    const { user: { email } } = store.getState();
    expect(email).toBe('alguem@alguem.com');
  });
});
