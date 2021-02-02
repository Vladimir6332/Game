import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLoginButton } from 'ts-react-google-login-component';
import LoginTabs from './LoginTabs';
import FormLogin from './FormLogin';
import Button from '../../utils/Button';
import NotCorrect from './notCorrect';
import Rotate from './Rotate';

interface Props {
  onLogin: (profile: ProfileOfUser) => void;
}

const Login: React.FC<Props> = ({ onLogin }: Props) => {
  const [type, setType] = useState<string>('login');
  const [
    currentUserProfile,
    setCurrentUserProfile,
  ] = useState<ProfileOfUser | null>(null);
  const [continueDisabled, setContinueDisabled] = useState<boolean>(true);
  const [isNotCorrect, setNotCorrect] = useState<boolean>(false);
  const [isRequestHandling, setRequestHandling] = useState<boolean>(false);

  const history = useHistory();

  const submitHandler = async () => {
    setRequestHandling(true);
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
    if (userProfile.status === false) {
      setNotCorrect(true);
      setTimeout(() => {
        setNotCorrect(false);
      }, 2000);
    } else {
      if (isNotCorrect) setNotCorrect(false);
      setProfileOfUser(userProfile);
    }
    setRequestHandling(false);
  };

  const continueHandler = () => {
    history.push('/garage');
  };

  const preLoginTracking = (): void => {
    console.log('Attemp to login with google');
  };
  const errorHandler = (error: string): void => {
    console.error(error);
  };

  const getUserByGoogleAuth = async (
    url: string,
    propToken: { token: string }
  ) => {
    setRequestHandling(true);
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(propToken),
    });
    const userProfile = await res.json();
    setRequestHandling(false);
    return userProfile;
  };

  const responseGoogle = async (
    googleUser: gapi.auth2.GoogleUser
  ): Promise<void> => {
    const idToken = googleUser.getAuthResponse(true).id_token;
    const url = `https://rs-clone-wars-be.herokuapp.com/googleAuth`;
    const propToken = { token: idToken };
    const userProfile = await getUserByGoogleAuth(url, propToken);
    setProfileOfUser(userProfile);
  };

  const setProfileOfUser = (profileOfUser: ProfileOfUser) => {
    if (profileOfUser && profileOfUser.id) {
      const copyProfileOfUser = { ...profileOfUser };
      copyProfileOfUser.lastVisit = new Date(copyProfileOfUser.lastVisit);
      setCurrentUserProfile(profileOfUser);
      onLogin(copyProfileOfUser);
      setContinueDisabled(false);
    } else setContinueDisabled(true);
  };
  const getCurrentEnter = (): 'login' | 'signUp' | 'reset' => {
    const currentType = document.querySelector('.active').id;
    let result: 'login' | 'signUp' | 'reset';
    if (currentType === 'login') {
      result = 'login';
    } else if (currentType === 'reset') {
      result = 'reset';
    } else {
      result = 'signUp';
    }
    return result;
  };
  const clientConfig = {
    client_id:
      '666292902237-cd5e1ic284vkroaaunh467jerkra7fn4.apps.googleusercontent.com',
  };

  const getTitle = (activeTab: string): string => {
    const START_MESSAGE = 'You have successfully logged in.';
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
      {isNotCorrect ? <NotCorrect type={getCurrentEnter()} /> : null}
      {isRequestHandling ? <Rotate /> : null}

      <LoginTabs setType={setType} disabled={continueDisabled} />
      <div className="login-form-container">
        <h2 className="login__title">{getTitle(type)}</h2>
        <FormLogin
          type={type}
          onLogin={submitHandler}
          disabled={continueDisabled}
          nickname={currentUserProfile?.nickName}
        />
      </div>

      {continueDisabled && (
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
      )}

      <Button disabled={continueDisabled} onClick={continueHandler}>
        Continue
      </Button>
    </div>
  );
};

export default Login;
