import { Code2, MessagesSquare } from 'lucide-react'

export default function CommunityLinks() {
  return (
    <div className="community">
      <span className="community__label mono dim">Follow along</span>
      <a
        className="community__link"
        href="https://github.com/layr-labs/d-inference"
        target="_blank"
        rel="noreferrer"
        aria-label="Darkbloom on GitHub"
        title="Darkbloom on GitHub"
      >
        <Code2 size={14} />
      </a>
      <a
        className="community__link"
        href="https://darkbloom.dev"
        target="_blank"
        rel="noreferrer"
        aria-label="Join the Darkbloom Slack"
        title="Join the Darkbloom Slack"
      >
        <MessagesSquare size={14} />
      </a>
    </div>
  )
}
