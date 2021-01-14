import React from 'react';

interface Props {
  setType: (type: string) => void;
}

const LoginTabs: React.FC<Props> = ({ setType }: Props) => {
  const clickHandler = (event: React.SyntheticEvent<EventTarget>): void => {
    const element = event.target as HTMLElement;
    if (element.tagName === 'LI') {
      setType(element.id);
      document.querySelectorAll('.login__tabs li').forEach((elem) => {
        if (elem.id === element.id) elem.classList.add('active');
        else elem.classList.remove('active');
      });
    }
  };

  return (
    <ul role="presentation" className="login__tabs" onClick={clickHandler}>
      <li id="login" className="active">
        Login
      </li>
      <li id="signUp">Register</li>
      <li id="reset">Reset Password</li>
    </ul>
  );
};

export default LoginTabs;
