import React from 'react'
import type { RegisterOptions, UseFormRegister } from 'react-hook-form'
interface Props {
  type: React.HTMLInputTypeAttribute
  name: string
  placeholder?: string
  errorMessage?: string
  className?: string
  register: UseFormRegister<any>
  rules?: RegisterOptions<any>
}
export default function Input({
  type,
  name,
  placeholder,
  errorMessage,
  className,
  register,
  rules
}: Props) {
  return (
    <div className={className}>
      <input
        type={type}
        className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
        placeholder={placeholder}
        {...register(name, rules)}
      />
      <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>
        {errorMessage}
      </div>
    </div>
  )
}
