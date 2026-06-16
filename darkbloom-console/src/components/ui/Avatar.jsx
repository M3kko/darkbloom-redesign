// Small blue-tint tile used for assistant/model/node identity.
export default function Avatar({ icon, size = 30, className = '' }) {
  return (
    <span className={`avatar ${className}`} style={{ width: size, height: size }} aria-hidden>
      {icon}
    </span>
  )
}
