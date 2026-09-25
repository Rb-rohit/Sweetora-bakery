export default function Icon({ children, className = 'w-5 h-5', viewBox = '0 0 24 24', fill = 'none', style, ...props }) {
  return (
    <svg
      className={`inline-block shrink-0 ${className}`}
      viewBox={viewBox}
      fill={fill}
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      {...props}
    >
      {children}
    </svg>
  )
}
