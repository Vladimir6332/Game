import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLoginButton } from 'ts-react-google-login-component';
import LoginTabs from './LoginTabs';
import FormLogin from './FormLogin';
import Button from '../../utils/Button';

interface Props {
  onLogin: (profile: ProfileOfUser) => void;
}

const Login: React.FC<Props> = ({ onLogin }: Props) => {
  const [type, setType] = useState<string>('login');
  const [continueDisabled, setContinueDisabled] = useState<boolean>(true);

  const history = useHistory();

  const submitHandler = async () => {
    const userName = (document.getElementById('username') as HTMLInputElement)
      .value;
    const password = (document.getElementById('password') as HTMLInputElement)
      .value;
    const data = { login: userName, password };
    const url = `https://rs-clone-wars-be.herokuapp.com/${type}Auth`;

    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const userProfile = await res.json();
    console.log(userProfile);
    setProfileOfUser(userProfile);
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

  const getUserByGoogleAuth = async (
    url: string,
    propToken: { token: string }
  ) => {
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propToken),
    });
    const userProfile = await res.json();
    return userProfile;
  };

  const responseGoogle = async (
    googleUser: gapi.auth2.GoogleUser
  ): Promise<void> => {
    const idToken = googleUser.getAuthResponse(true).id_token;
    const googleId = googleUser.getId();
    const name = googleUser.getBasicProfile();
    console.log(idToken, googleId, name);
    const url = `https://rs-clone-wars-be.herokuapp.com/googleAuth`;
    const propToken = { token: idToken };
    const userProfile = await getUserByGoogleAuth(url, propToken);
    setProfileOfUser(userProfile);
  };

  const setProfileOfUser = (profileOfUser: ProfileOfUser) => {
    if (profileOfUser && profileOfUser.id) {
      const copyProfileOfUser = { ...profileOfUser };
      copyProfileOfUser.lastVisit = new Date(copyProfileOfUser.lastVisit);
      onLogin(copyProfileOfUser);
      setContinueDisabled(false);
    } else setContinueDisabled(true);
  };

  const clientConfig = {
    client_id:
      '666292902237-cd5e1ic284vkroaaunh467jerkra7fn4.apps.googleusercontent.com',
  };

  const getTitle = (activeTab: string): string => {
    const START_MESSAGE = 'Press Continue to start the game:';
    const LOGIN_MESSAGE = 'Login for continuing game:';
    const REGISTER_MESSAGE = 'Register new user:';
    const RESET_MESSAGE = 'Reset profile of user:';
    if (!continueDisabled) return START_MESSAGE;
    if (activeTab === 'login') return LOGIN_MESSAGE;
    if (activeTab === 'signUp') return REGISTER_MESSAGE;
    if (activeTab === 'reset') return RESET_MESSAGE;
    return LOGIN_MESSAGE;
  };

  const signInOptions = { scope: 'profile' };
  return (
    <div className="login">
      <LoginTabs setType={setType} disabled={continueDisabled} />
      <div className="login-form-container">
        <h2 className="login__title">{getTitle(type)}</h2>
        <FormLogin
          type={type}
          onLogin={submitHandler}
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
