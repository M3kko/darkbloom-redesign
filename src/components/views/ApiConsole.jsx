import Section from '../layout/Section.jsx'
import Card from '../ui/Card.jsx'
import CodeBlock from '../ui/CodeBlock.jsx'
import CodeTabs from '../ui/CodeTabs.jsx'
import Accordion, { AccordionItem } from '../ui/Accordion.jsx'
import StatusBadge from '../ui/StatusBadge.jsx'
import ApiKeysManager from '../api-keys/ApiKeysManager.jsx'
import { baseUrl, endpoints, quickStart } from '../../data/api.js'
import { models } from '../../data/models.js'

export default function ApiConsole() {
  return (
    <Section
      index="04"
      eyebrow="API"
      title="API console"
      desc="OpenAI-compatible. Swap your base URL, keep your code. Every request is end-to-end encrypted and processed on hardware-attested Apple Silicon."
    >
      <Card className="card--pad api-base">
        <span className="label">Base URL</span>
        <CodeBlock code={baseUrl} />
        <p className="mono dim api-base__note">
          All endpoints are relative to this base URL. Attestation and pricing endpoints are public — no auth required.
        </p>
      </Card>

      <div className="block-head"><div><h3 className="card-title">Endpoint reference</h3><p className="mono dim block-head__sub">{endpoints.length} endpoints · OpenAI-compatible surface.</p></div></div>
      <Accordion>
        {endpoints.map((e) => (
          <AccordionItem
            key={e.path}
            header={
              <span className="ep">
                <span className={`ep__method ep__method--${e.method.toLowerCase()}`}>{e.method}</span>
                <span className="ep__path mono">{e.path}</span>
              </span>
            }
            meta={<StatusBadge tone={e.auth ? 'verified' : 'degraded'}>{e.auth ? 'Auth' : 'Public'}</StatusBadge>}
          >
            <p className="mono dim ep__desc">{e.desc}</p>
            <div className="ep__grid">
              {e.request && (
                <div>
                  <span className="label">Request</span>
                  <CodeBlock code={e.request} lang="json" />
                </div>
              )}
              <div>
                <span className="label">Response</span>
                <CodeBlock code={e.response} lang="json" />
              </div>
            </div>
            {e.note && <p className="mono dim ep__note">{e.note}</p>}
          </AccordionItem>
        ))}
      </Accordion>

      <div className="block-head"><div><h3 className="card-title">Quick start</h3><p className="mono dim block-head__sub">Install the OpenAI SDK or Vercel AI SDK — just change the base URL.</p></div></div>
      <CodeTabs tabs={quickStart} />

      <div className="block-head"><div><h3 className="card-title">Available models</h3></div></div>
      <Card className="card--pad">
        <div className="apimodels">
          <div className="apimodels__row apimodels__row--head label">
            <span>Model ID</span><span>Context</span><span>Quant</span><span className="apimodels__r">Trust</span>
          </div>
          {models.map((m) => (
            <div className="apimodels__row" key={m.id}>
              <span className="mono hi">{m.id}</span>
              <span className="mono dim">131.1K</span>
              <span className="mono dim">{m.badge.split('·')[1]?.trim() || '—'}</span>
              <span className="apimodels__r"><StatusBadge tone="verified">Hardware</StatusBadge></span>
            </div>
          ))}
        </div>
      </Card>

      <div className="block-head"><div><h3 className="card-title">API keys</h3><p className="mono dim block-head__sub">Create scoped keys with spend caps, rate limits, and model allowlists.</p></div></div>
      <Card className="card--pad">
        <ApiKeysManager />
      </Card>
    </Section>
  )
}
