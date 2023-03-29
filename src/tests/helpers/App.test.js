import { screen, fireEvent, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import { legacy_createStore as createStore, applyMiddleware } from 'redux';
// import { createMemoryHistory } from 'history';
// import { withRouter } from './renderWith';
// import { composeWithDevTools } from '@redux-devtools/extension';
// import thunk from 'redux-thunk';
import App from '../../App';
// import rootReducer from '../../redux/reducers';
import store from '../../redux/store';
// import fetchApiData from '../../services';
// import Wallet from '../../pages/Wallet';

// const history = createMemoryHistory();

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

    fireEvent.change(email, { target: { value: '123@gmail.com' } });
    fireEvent.change(password, { target: { value: '123abc789' } });
    expect(submitButton).not.toBeDisabled();
  });
});

describe('Testa a página da Carteira', () => {
  // beforeEach(() => {
  //   jest.resetAllMocks();
  // });
  const emailInput = 'email-input';
  const passwordInput = 'password-input';
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
    const emailName = 'jg@gmail.com';

    fireEvent.change(email, { target: { value: emailName } });
    fireEvent.change(password, { target: { value: '123abc789' } });
    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    userEvent.click(submitButton);

    const emailPlace = screen.getByTestId('email-field');
    expect(emailPlace.innerHTML).toBe(emailName);
  });
  test('verifica se os itens da tabela aparecem em tela', () => {
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

    const description = screen.getByRole('columnheader', { name: 'Descrição' });
    const tag = screen.getByRole('columnheader', { name: 'Tag' });
    const payment = screen.getByRole('columnheader', { name: 'Método de pagamento' });
    const value = screen.getByRole('columnheader', { name: 'Valor' });
    const currency = screen.getByRole('columnheader', { name: 'Moeda' });
    const exchange = screen.getByRole('columnheader', { name: 'Câmbio utilizado' });
    const converted = screen.getByRole('columnheader', { name: 'Valor convertido' });
    const conversion = screen.getByRole('columnheader', { name: 'Moeda de conversão' });
    const edit = screen.getByRole('columnheader', { name: 'Editar/Excluir' });

    expect(description).toBeInTheDocument();
    expect(tag).toBeInTheDocument();
    expect(payment).toBeInTheDocument();
    expect(value).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
    expect(exchange).toBeInTheDocument();
    expect(converted).toBeInTheDocument();
    expect(conversion).toBeInTheDocument();
    expect(edit).toBeInTheDocument();
  });
  test('verifica se os itens do header aparecem em tela', () => {
    render(
      <MemoryRouter>
        <Provider store={ store }>
          <App />
        </Provider>
      </MemoryRouter>,
    );
    const email = screen.getByTestId(emailInput);
    const password = screen.getByTestId(passwordInput);
    const emailName = 'jgvfv@gmail.com';

    fireEvent.change(email, { target: { value: emailName } });
    fireEvent.change(password, { target: { value: '123abc789' } });
    const submitButton = screen.getByRole('button', { name: 'Entrar' });
    userEvent.click(submitButton);

    const emailHeader = screen.getByTestId('email-field');
    const expenses = screen.getByRole('heading', { level: 5, name: 'Gastos' });
    const total = screen.getByRole('heading', { level: 5, name: '0.00' });
    const exchange = screen.getByRole('heading', { level: 5, name: 'Câmbio' });
    const currency = screen.getByTestId('header-currency-field');

    expect(emailHeader).toBeInTheDocument();
    expect(expenses).toBeInTheDocument();
    expect(total).toBeInTheDocument();
    expect(exchange).toBeInTheDocument();
    expect(currency).toBeInTheDocument();
  });
  test('verifica se os inputs aparecem em tela', () => {
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

    const valueInput = screen.getByTestId('value-input');
    const descriptionInput = screen.getByTestId('description-input');
    const currencyInput = screen.getByTestId('currency-input');
    const methodInput = screen.getByTestId('method-input');
    const tagInput = screen.getByTestId('tag-input');
    const addExpense = screen.getByRole('button', { name: 'Adicionar Despesa' });

    expect(valueInput).toBeInTheDocument();
    expect(descriptionInput).toBeInTheDocument();
    expect(currencyInput).toBeInTheDocument();
    expect(methodInput).toBeInTheDocument();
    expect(tagInput).toBeInTheDocument();
    expect(addExpense).toBeInTheDocument();
  });
  // test('calcula o total de gastos com conversão para real', async () => {
  //   jest.mock('../../services/index.js');
  //   const testState = {
  //     currencies: [
  //       { name: 'US Dollar', code: 'USD' },
  //       { name: 'Euro', code: 'EUR' },
  //       { name: 'Bitcoin', code: 'BTC' },
  //     ],
  //     user: {
  //       email: 'joaogabrielvalenca@gmail.com',
  //       password: '123abc789',
  //     },
  //     expenses: [
  //       { id: 1, value: 1, description: 'comida', currency: 'USD', method: 'Dinheiro', tag: 'Alimentação', exchangeRates: { USD: { ask: '5.20' } } },
  //     ],
  //   };

  //   const testStore = createStore(rootReducer, testState);

  //   const fetchApiData = require('../../services/index');

  //   fetchApiData.default = jest.fn().mockResolvedValue({
  //     USD: { ask: '5.20' },
  //     EUR: { ask: '6.00' },
  //     BTC: { ask: '7.00' },
  //   });
  //   render(
  //     <MemoryRouter>
  //       <Provider store={ testStore }>
  //         <Wallet />
  //       </Provider>
  //     </MemoryRouter>,
  //   );

  //   history.push('/carteira');

  //   const valueInput = screen.getByTestId('value-input');
  //   const addExpense = screen.getByRole('button', { name: 'Adicionar Despesa' });

  //   fireEvent.change(valueInput, { target: { value: 1 } });
  //   userEvent.click(addExpense);

  //   const totalExpense = screen.getByTestId('total-field');
  //   expect(totalExpense.textContent).toEqual('5.20');
  // });
});
