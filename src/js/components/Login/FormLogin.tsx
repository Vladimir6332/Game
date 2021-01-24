import React from 'react';

interface Props {
  type: string;
  onLogin: () => void;
  disabled: boolean;
  nickname?: string;
}

const FormLogin: React.FC<Props> = ({
  type,
  onLogin,
  disabled,
  nickname,
}: Props) => {
  interface PropsOfButtonValue {
    [key: string]: string;
  }
  const listOfButtonValue: PropsOfButtonValue = {
    login: 'Login',
    signUp: 'Sign up',
    reset: 'Reset',
  };

  const clickHandler = (event: React.SyntheticEvent<EventTarget>): void => {
    event.preventDefault();
    onLogin();
  };

  const getClassesOfAuthField = (isDisable: boolean): string =>
    `auth__field${disabled ? '' : ' auth__field_active'}`;

  return disabled ? (
    <form className="auth__form">
      <fieldset className={getClassesOfAuthField(disabled)}>
        <label className="auth__label" htmlFor="username">
          Username:
          <input
            className="auth__input"
            type="text"
            id="username"
            name="username"
            placeholder="Username"
          />
        </label>

        <label className="auth__label" htmlFor="password">
          Password:
          <input
            className="auth__input"
            type="password"
            id="password"
            placeholder="Password"
          />
        </label>

        <input
          type="submit"
          onClick={clickHandler}
          value={listOfButtonValue[type] || 'Login'}
          className="button button_sign-up"
        />
      </fieldset>
    </form>
  ) : (
    <span className="login__title">
      {`Hello, ${nickname}!`}
      <br />
      Press continue to start the game!
    </span>
  );
};

FormLogin.defaultProps = {
  nickname: 'Player',
};

export default FormLogin;
