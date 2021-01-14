import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLoginButton } from 'ts-react-google-login-component';
import LoginTabs from './LoginTabs';
import FormLogin from './FormLogin';
import Button from '../../utils/Button';

const users = [{ userName: 'admin', password: 'admin' }];

const Login: React.FC = () => {
  const [type, setType] = useState<string>('login');
  const [continueDisabled, setContinueDisabled] = useState<boolean>(true);

  const history = useHistory();

  const validateLogin = () => {
    const userName = (document.getElementById('username') as HTMLInputElement)
      .value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;

    const validatedUser = users.find(
      (user) => user.userName === userName && user.password === password
    );

    if (validatedUser) {
      console.log(validatedUser);
      setContinueDisabled(false);
    } else setContinueDisabled(true);
  };

  const continueHandler = () => {
    history.push('/garage');
  };

  const preLoginTracking = (): void => {
    console.log('Attemp to login with google');
  };
  const errorHandler = (error: string): void => {
    // handle error if login got failed...
    console.error(error);
  };
  const responseGoogle = (googleUser: gapi.auth2.GoogleUser): void => {
    const idToken = googleUser.getAuthResponse(true).id_token;
    const googleId = googleUser.getId();
    const name = googleUser.getBasicProfile();
    console.log(idToken, googleId, name);

    // Make user login in your system
    // login success tracking...
  };
  const clientConfig = {
    client_id:
      '666292902237-cd5e1ic284vkroaaunh467jerkra7fn4.apps.googleusercontent.com',
  };

  const signInOptions = { scope: 'profile' };
  return (
    <div className="login">
      <LoginTabs setType={setType} />
      <div className="login-form-container">
        <h2 className="login__title">Login for continuing game:</h2>
        <FormLogin
          type={type}
          onLogin={validateLogin}
          disabled={continueDisabled}
        />
      </div>

      <GoogleLoginButton
        responseHandler={responseGoogle}
        clientConfig={clientConfig}
        preLogin={preLoginTracking}
        failureHandler={errorHandler}
        singInOptions={signInOptions}
        classNames="login__google"
      >
        <div className="google__icon" />
        <span className="google__title">Sign in</span>
      </GoogleLoginButton>
      <Button disabled={continueDisabled} onClick={continueHandler}>
        Continue
      </Button>
    </div>
  );
};

export default Login;
