import { useReveal } from '../../hooks/useReveal.js'

/** Fades + slides content up once it scrolls into view — matches the original .reveal class. */
export default function Reveal({ as: Tag = 'div', className = '', delay = 0, children, ...props }) {
  const [ref, inView] = useReveal()
  return (
    <Tag
      ref={ref}
      className={`transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-7'} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
      {...props}
    >
      {children}
    </Tag>
  )
}
