export default function Card({ children, className = '', as: Tag = 'div', verify = false, ...rest }) {
  return (
    <Tag className={`card${verify ? ' card--verify' : ''} ${className}`} {...rest}>
      {children}
    </Tag>
  )
}

export function CardHeader({ children, className = '' }) {
  return <div className={`card__head ${className}`}>{children}</div>
}
