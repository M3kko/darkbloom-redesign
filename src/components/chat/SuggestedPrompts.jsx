import { suggestedPrompts } from '../../data/chat.js'

export default function SuggestedPrompts({ onPick }) {
  return (
    <div className="suggest">
      {suggestedPrompts.map((p) => (
        <button key={p} className="suggest__tile mono" onClick={() => onPick(p)}>
          <span className="suggest__arrow" aria-hidden>›_</span>
          {p}
        </button>
      ))}
    </div>
  )
}
