import { screen, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
// import { legacy_createStore as createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
// import { composeWithDevTools } from '@redux-devtools/extension';
// import thunk from 'redux-thunk';
import App from '../../App';
// import rootReducer from '../../redux/reducers';
import store from '../../redux/store';

describe('Testa a página de Login', () => {
  const emailInput = 'email-input';
  const passwordInput = 'password-input';
  test('verifica se há o input de login e de senha', () => {
    render(
      <MemoryRouter>
        <Provider store={ store }>
          <App />
        </Provider>
      </MemoryRouter>,
    );
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
  test('verifica se há o botão de submit', () => {
    render(
      <MemoryRouter>
        <Provider store={ store }>
          <App />
        </Provider>
      </MemoryRouter>,
    );
    const submitButton = screen.getByRole('button');
    expect(submitButton).toBeDisabled();
  });
  test('Verifica se ao preencher os inputs o botão fica habilitado', () => {
    render(
      <MemoryRouter>
        <Provider store={ store }>
          <App />
        </Provider>
      </MemoryRouter>,
    );
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const submitButton = screen.getByRole('button');

    fireEvent.change(email, { target: { value: 'joaogabrielvalenca@gmail.com' } });
    fireEvent.change(password, { target: { value: '123abc789' } });
    expect(submitButton).not.toBeDisabled();
  });
  test('verifica se ao clicar no botão de submit o usuário aparece na tela', () => {
    render(
      <MemoryRouter>
        <Provider store={ store }>
          <App />
        </Provider>
      </MemoryRouter>,
    );
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const emailName = 'joaogabrielvalenca@gmail.com';

    fireEvent.change(email, { target: { value: emailName } });
    fireEvent.change(password, { target: { value: '123abc789' } });
    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    userEvent.click(submitButton);

    const emailPlace = screen.getByTestId('email-field');
    expect(emailPlace.innerHTML).toBe(emailName);
  });
});
describe('Testa a página da Carteira', () => {
  test('verifica se há o input de login e de senha', () => {
    render(
      <MemoryRouter>
        <Provider store={ store }>
          <App />
        </Provider>
      </MemoryRouter>,
    );
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    expect(email).toBeInTheDocument();
    expect(password).toBeInTheDocument();
  });
});
