import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { schema, type Schema } from '../../untils/rules'
import { yupResolver } from '@hookform/resolvers/yup'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../apis/auth.api'
import { isAxiosUnprocessableEntityError } from '../../untils/utils'
import type { ResponseApi } from '../../types/utils.type'
import Input from '../../Components/Input'

type FormData = Schema
export default function Login() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  const loginMutation = useMutation({
    mutationFn: (body: Omit<FormData, 'confirm_password'>) => login(body)
  })
  // const rules = getRules(getValues)
  const onSubmit = handleSubmit((data) => {
    const body = data

    loginMutation.mutate(body, {
      onSuccess: (data) => {
        console.log('Kết quả API:', data)
      },
      onError: (error) => {
        if (isAxiosUnprocessableEntityError<ResponseApi<FormData>>(error)) {
          const formError = error.response?.data.data
          if (formError) {
            Object.keys(formError).forEach((key) => {
              setError(key as keyof FormData, {
                message: formError[key as keyof FormData],
                type: 'Server'
              })
            })
          }
        }
      }
    })
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form
              className='p-10 rounded bg-white shadow-sm'
              onSubmit={onSubmit}
            >
              <div className='text-2xl'>Đăng nhập</div>
              <Input
                type='email'
                name='email'
                className='mt-8'
                placeholder='Email'
                register={register}
                errorMessage={errors.email?.message}
              />
              <Input
                type='password'
                name='password'
                className='mt-3'
                register={register}
                errorMessage={errors.password?.message}
                placeholder='Password'
              />
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng nhập
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn chưa có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/register'>
                  Đăng ký
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
