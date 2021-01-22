import React from 'react';

interface Props {
  children: React.ReactNode;
  disabled?: boolean;
  onClick: () => void;
}

const Button = ({ children, disabled, onClick }: Props): React.ReactElement => {
  const getClassesOfButton = (isDisable: boolean): string =>
    `button${disabled ? ' button_disabled' : ''}`;

  return (
    <button
      className={getClassesOfButton(disabled)}
      type="button"
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

Button.defaultProps = { disabled: true };

export default Button;
