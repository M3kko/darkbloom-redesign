export default function Button({
  children,
  variant = 'secondary',
  size = 'md',
  loading = false,
  iconOnly = false,
  className = '',
  ...rest
}) {
  return (
    <button
      className={`btn btn--${variant} btn--${size}${iconOnly ? ' btn--icon' : ''} ${className}`}
      data-loading={loading || undefined}
      {...rest}
    >
      {loading && <span className="btn__spinner" aria-hidden />}
      <span className="btn__label">{children}</span>
    </button>
  )
}
