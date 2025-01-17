import React from 'react';
import { FieldError } from 'react-hook-form';

export default function FormError({ children }: any) {
  return (
    <>{children && <span className='text-red-500 text-sm'>{children}</span>}</>
  );
}
