import React from 'react';
import './button.scss';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
  isSubmitButton?: boolean;
}

export default function Button({
  onClick,
  children,
  isSubmitButton = false
}: ButtonProps) {
  return (
    <button
      role='button'
      onClick={onClick}
      type={isSubmitButton ? 'submit' : 'button'}
    >
      {children}
    </button>
  );
}
