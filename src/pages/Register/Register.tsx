import { useForm, type RegisterOptions } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { schema, type Schema } from '../../untils/rules'
import Input from '../../Components/Input'
import { yupResolver } from '@hookform/resolvers/yup'

type FormData = Schema
export default function Register() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: yupResolver(schema)
  })
  // const rules = getRules(getValues)
  const onSubmit = handleSubmit((data) => {
    const pass = getValues('password')
    console.log(pass)
  })
  return (
    <div className='bg-orange'>
      <div className='container'>
        <div className='grid grid-cols-1 lg:grid-cols-5 py-12 lg:py-32 lg:pr-10'>
          <div className='lg:col-span-2 lg:col-start-4'>
            <form
              className='p-10 rounded bg-white shadow-sm'
              onSubmit={onSubmit}
              noValidate
            >
              <div className='text-2xl'>Đăng ký</div>
              <Input
                name='email'
                type='email'
                register={register}
                className='mt-8'
                errorMessage={errors.email?.message}
                placeholder='Email'
              />
              {/* <div className='mt-8'>
                <input
                  type='email'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Email'
                  {...register(
                    'email',
                    rules.email as RegisterOptions<FormData, 'email'>
                  )}
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>
                  {errors.email?.message}
                </div>
              </div> */}
              <Input
                name='password'
                type='password'
                register={register}
                className='mt-2'
                errorMessage={errors.password?.message}
                placeholder='Password'
              />
              {/* <div className='mt-3'>
                <input
                  type='password'
                  {...register(
                    'password',
                    rules.password as RegisterOptions<FormData, 'password'>
                  )}
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Password'
                  autoComplete='on'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>
                  {errors.password?.message}
                </div>
              </div> */}
              <Input
                name='confirm_password'
                type='password'
                register={register}
                className='mt-2'
                errorMessage={errors.confirm_password?.message}
                placeholder='Password'
              />
              {/* <div className='mt-3'>
                <input
                  {...register('confirm_password', {
                    ...(rules.confirm_password as RegisterOptions<
                      FormData,
                      'confirm_password'
                    >)
                  })}
                  type='password'
                  className='p-3 w-full outline-none border border-gray-300 focus:border-gray-500 rounded-sm focus:shadow-sm'
                  placeholder='Confirm Password'
                  autoComplete='on'
                />
                <div className='mt-1 text-red-600 min-h-[1rem] text-sm'>
                  {errors.confirm_password?.message}
                </div>
              </div> */}
              <div className='mt-3'>
                <button
                  type='submit'
                  className='w-full text-center py-4 px-2 uppercase bg-red-500 text-white text-sm hover:bg-red-600'
                >
                  Đăng ký
                </button>
              </div>
              <div className='flex items-center justify-center mt-8'>
                <span className='text-gray-400'>Bạn đã có tài khoản?</span>
                <Link className='text-red-400 ml-1' to='/login'>
                  Đăng nhập
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
