import React, { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  arrow,
  safePolygon
} from '@floating-ui/react'
export default function Header() {
  // const arrowRef = useRef<HTMLElement>(null)
  const arrowRef = useRef<HTMLSpanElement | null>(null)
  const [open, setOpen] = useState(false)

  const { refs, floatingStyles, context, middlewareData, placement } =
    useFloating({
      open: open,
      onOpenChange: setOpen,
      placement: 'bottom-end',
      middleware: [offset(8), flip(), shift(), arrow({ element: arrowRef })],
      whileElementsMounted: autoUpdate,
      strategy: 'absolute'
    })
  const hover = useHover(context, { move: false, handleClose: safePolygon() })
  const focus = useFocus(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, {
    // If your reference element has its own label (text).
    role: 'tooltip'
    // If your reference element does not have its own label,
    // e.g. an icon
  })

  // Merge all the interactions into prop getters
  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ])
  return (
    <div className='pb-5 pt-2 bg-primary'>
      <div className='container'>
        <div className='flex justify-end'>
          <div
            className='flex items-center py-1 hover:text-gray-300 cursor-pointer'
            ref={refs.setReference}
            {...getReferenceProps()}
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-1.605.42-3.113 1.157-4.418'
              />
            </svg>
            <span className='mx-1'>Tiếng Việt</span>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              strokeWidth={1.5}
              stroke='currentColor'
              className='size-5'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='m19.5 8.25-7.5 7.5-7.5-7.5'
              />
            </svg>
            <FloatingPortal>
              <AnimatePresence>
                {open && (
                  <div
                    ref={refs.setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                  >
                    <motion.div
                      initial={{ opacity: 0, transform: 'scale(0)' }}
                      animate={{ opacity: 1, transform: 'scale(1)' }}
                      exit={{ opacity: 0, transform: 'scale(0)' }}
                      transition={{ duration: 0.2 }}
                      style = {{
                        transformOrigin:`${middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : 'center'} top`
                      }}
                    >
                      <span
                        ref={arrowRef}
                        className='border-t-0 border-x-transparent border-b-white border-[11px] absolute'
                        style={{
                          left:
                            middlewareData.arrow?.x != null
                              ? `${middlewareData.arrow.x}px`
                              : undefined,
                          top:
                            middlewareData.arrow?.y != null
                              ? `${middlewareData.arrow.y}px`
                              : undefined,
                          transform: placement?.startsWith('bottom')
                            ? 'translateY(-100%)'
                            : placement?.startsWith('top')
                              ? 'translateY(100%)'
                              : undefined
                        }}
                      />
                      <div className='bg-white relative shadow-md rounded-sm border boeder-gray-200'>
                        <div className='flex flex-col py-2 px-3'>
                          <button className='py-2 px-3 hover:bg-secondary'>
                            Tiếng Việt
                          </button>
                          <button className='py-2 px-3 hover:bg-secondary'>
                            English
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                )}
              </AnimatePresence>
            </FloatingPortal>
          </div>

          <div className='cursor-pointer hover:text-gray-300 flex items-center py-1 ml-6'>
            <div className='text-white w-5 h-5 mr-2 flex-shrink-0'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={1.5}
                stroke='currentColor'
                className='w-full h-full object-cover rounded-full'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z'
                />
              </svg>
            </div>
            <div className='text-black hover:text-gray-300'>Vo Nhu Hoa</div>
          </div>
        </div>
        <div className='grid grid-cols-12 gap4 mt-4 items-end'>
          <Link className='flex col-span-2' to='/'>
            <img
              src='../../../public/logo.png'
              alt='Shopee Logo'
              className='h-12 w-12'
            />
            <p className='m-auto ml-1 text-white'>ABaBaNa</p>
          </Link>
          <form className='col-span-9'>
            <div className='bg-white rounded-sm p-1 flex'>
              <input
                placeholder='Tìm kiếm sản phẩm, danh mục hay thương hiệu mong muốn ...'
                type='text'
                className='text-black px-3 py-2 flex-grow border-none outline-none'
              />
              <button className='rounded py-2 px-6 flex-shrink-0 bg-primary hover:opacity-90'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth={1.5}
                  className='w-6 h-6'
                  color='white'
                  stroke='currentColor'
                >
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z'
                  />
                </svg>
              </button>
            </div>
          </form>
          <div className='col-span-1 ml-4'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              fill='none'
              viewBox='0 0 24 24'
              stroke-width='1.5'
              stroke='currentColor'
              color='white'
              className='size-8'
            >
              <path
                stroke-linecap='round'
                stroke-linejoin='round'
                d='M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z'
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}
