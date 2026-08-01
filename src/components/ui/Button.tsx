import React from 'react'
import { cn } from '@/utils/cn'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
}

/** Reusable button with variant support (primary, secondary, outline). */
export default function Button({ children, variant = 'primary', className, ...props }: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center rounded-lg px-6 py-3 font-medium transition-all duration-300 active:scale-95 cursor-pointer'

  const variants = {
    primary: 'bg-primary text-surface hover:bg-primary-light shadow-lg shadow-primary/40 hover:shadow-primary/70 hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02]',
    secondary: 'bg-surface-lighter text-text hover:bg-surface-light hover:-translate-y-0.5 hover:scale-[1.02]',
    outline: 'border border-primary/50 text-primary hover:border-primary hover:bg-primary/10 hover:-translate-y-0.5 hover:scale-[1.02]',
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </button>
  )
}
