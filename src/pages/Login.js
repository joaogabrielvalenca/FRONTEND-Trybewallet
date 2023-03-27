import React from 'react';
import { connect } from 'react-redux';
import Proptypes from 'prop-types';
import { addEmail } from '../redux/actions';

class Login extends React.Component {
  state = {
    emailLogin: '',
    password: '',
    isDisabled: true,
  };

  onEmailInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ emailLogin: value }, () => this.checkEnabledButton());
  };

  onPasswordInputChange = ({ target }) => {
    const { value } = target;
    this.setState({ password: value }, () => this.checkEnabledButton());
  };

  checkEnabledButton = () => {
    const { emailLogin, password } = this.state;
    const regex = /\S+@\S+\.\S+/;
    const validateEmail = regex.test(emailLogin);
    if (validateEmail && password.length >= Number('6')) {
      this.setState({ isDisabled: false });
    } else {
      this.setState({ isDisabled: true });
    }
  };

  onHandleClick = () => {
    const { dispatch } = this.props;
    const { history } = this.props;
    const { emailLogin } = this.state;
    dispatch(addEmail(emailLogin));
    history.push('/carteira');
  };

  render() {
    const { isDisabled } = this.state;
    return (
      <div>
        <h1>TrybeWallet</h1>
        <h3>Login</h3>
        <form>
          <label htmlFor="emailInput">
            E-mail
            <input
              type="email"
              data-testid="email-input"
              placeholder="123@gmail.com"
              onChange={ this.onEmailInputChange }
            />
          </label>
          <label htmlFor="passwordInput">
            Password
            <input
              type="password"
              data-testid="password-input"
              onChange={ this.onPasswordInputChange }
            />
          </label>
          {/* <Link to="/wallet"> */}
          <button
            type="button"
            disabled={ isDisabled }
            onClick={ () => this.onHandleClick() }
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: Proptypes.func.isRequired,
  history: Proptypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  user: state.user.email,
});

export default connect(mapStateToProps)(Login);
