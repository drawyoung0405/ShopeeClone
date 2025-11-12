import React, { useRef, useState, useId, type ElementType } from 'react'
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
interface Props {
  children: React.ReactNode
  renderPopover: React.ReactNode
  className?: string
  as?: ElementType
  initialOpen?: boolean
}
export default function Popover({ children, className, renderPopover, as: Element='div', initialOpen }: Props) {
  const arrowRef = useRef<HTMLSpanElement | null>(null)
  const [open, setOpen] = useState(initialOpen||false)

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
  const id = useId()
  const role = useRole(context, {
    role: 'tooltip'
  })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    hover,
    focus,
    dismiss,
    role
  ])
  return (
    <Element className={className} ref={refs.setReference} {...getReferenceProps()}>
      {children}
      <FloatingPortal id={id}>
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
                style={{
                  transformOrigin: `${middlewareData.arrow?.x != null ? `${middlewareData.arrow.x}px` : 'center'} top`
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
                {renderPopover}
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </FloatingPortal>
    </Element>
  )
}
