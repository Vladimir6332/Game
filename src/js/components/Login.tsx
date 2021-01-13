import React from 'react';
import { GoogleLoginButton } from 'ts-react-google-login-component';

const Login: React.FC = () => {
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

    console.log({ googleId });
    console.log({ accessToken: idToken });
    console.log(name);
    // Make user login in your system
    // login success tracking...
  };
  const clientConfig = {
    client_id:
      '666292902237-cd5e1ic284vkroaaunh467jerkra7fn4.apps.googleusercontent.com',
  };

  const signInOptions = { scope: 'profile' };
  return (
    <div>
      <GoogleLoginButton
        responseHandler={responseGoogle}
        clientConfig={clientConfig}
        preLogin={preLoginTracking}
        failureHandler={errorHandler}
        singInOptions={signInOptions}
      />
    </div>
  );
};

export default Login;
