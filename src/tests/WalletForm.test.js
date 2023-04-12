import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WalletForm from '../components/WalletForm';
import { renderWithRedux } from './helpers/renderWith';

describe('Testa componente WalletForm', () => {
  it('', async () => {
    renderWithRedux(<WalletForm />);

    const valueInput = screen.getByTestId('value-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const descriptionInput = screen.getByTestId('description-input');
    const button = screen.getByRole('button');

    userEvent.type(valueInput, '2');
    userEvent.type(descriptionInput, 'any');
    userEvent.type(currencyInput, 'CAD');
    userEvent.type(methodInput, 'Cartão de Crédito');
    userEvent.type(tagInput, 'Alimentação');
    userEvent.click(button);
  });
});
