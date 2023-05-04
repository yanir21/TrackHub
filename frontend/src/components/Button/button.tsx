import React from 'react';
import './button.scss';

interface ButtonProps {
  onClick?: () => void;
  children: React.ReactNode;
}

export default function Button({ onClick, children }: ButtonProps) {
  return (
    <button role='button' onClick={onClick}>
      {children}
    </button>
  );
}
