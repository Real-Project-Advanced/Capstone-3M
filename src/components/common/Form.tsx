'use client';

import { ReactNode } from 'react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: string;
}

/**
 * FormField: Componente de campo de formulario reutilizable
 */
export function FormField({
  label,
  name,
  type = 'text',
  placeholder = '',
  required = false,
  autoComplete,
}: FormFieldProps) {
  return (
    <label className="block">
      <span className="text-sm font-bold text-slate-700">{label}</span>
      <input
        className="mt-2 h-12 w-full rounded-lg border border-slate-300 px-4 text-sm outline-none transition focus:border-blue-700 focus:ring-4 focus:ring-blue-100"
        type={type}
        name={name}
        placeholder={placeholder}
        autoComplete={autoComplete}
        required={required}
      />
    </label>
  );
}

interface FormProps {
  children: ReactNode;
  action: (formData: FormData) => Promise<any> | void;
  className?: string;
}

/**
 * Form: Componente de formulario reutilizable
 */
export function Form({ children, action, className = '' }: FormProps) {
  return (
    <form action={action} className={`space-y-5 ${className}`}>
      {children}
    </form>
  );
}

interface FormButtonProps {
  children: ReactNode;
  type?: 'submit' | 'button' | 'reset';
  variant?: 'primary' | 'secondary';
  className?: string;
}

/**
 * FormButton: Botón de formulario reutilizable
 */
export function FormButton({ children, type = 'submit', variant = 'primary', className = '' }: FormButtonProps) {
  const baseClass = 'h-12 w-full rounded-lg font-bold transition';
  const variantClass =
    variant === 'primary'
      ? 'bg-blue-700 text-white hover:bg-blue-800'
      : 'bg-slate-200 text-slate-700 hover:bg-slate-300';

  return (
    <button type={type} className={`${baseClass} ${variantClass} ${className}`}>
      {children}
    </button>
  );
}
