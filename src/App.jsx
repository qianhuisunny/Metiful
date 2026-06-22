import { useEffect, useMemo, useState } from 'react'
import { ArrowRight, ArrowUpRight, ArrowsOut, Check, Circle, CurrencyDollar, HandHeart, Lightbulb, List, Megaphone, PencilSimpleLine, RocketLaunch, Sparkle, SquaresFour, Strategy, TrendUp, UserCheck, UsersThree, X } from '@phosphor-icons/react'
import Cal, { getCalApi } from '@calcom/embed-react'
import { CALENDAR_LINK } from './config'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' },
]

const headerNavItems = [
  navItems[0],
  { label: 'The Bottleneck', href: '/#the-bottleneck', anchor: true },
  { label: 'Our Offerings', href: '/#our-offerings', anchor: true },
  { label: 'How We Solve That', href: '/#how-we-solve-that', anchor: true },
  navItems[1],
]

const systems = [
  {
    number: '01', label: 'Audit + Strategy', eyebrow: '01. CONTENT AUDIT & STRATEGY CREATION',
    title: 'Start with the content you already have.',
    body: 'We surface the knowledge, content, and operating patterns your team already relies on—then turn what we find into a strategy tied to your goals.',
    points: ['Documentation scattered across tools and teams', 'Success stories and failure patterns held in people’s heads', 'Product launches outpacing sales enablement and customer education', 'Content shipped without a clear map of what to cover next'],
    visualLabel: 'AUDIT SIGNALS',
    queue: [['Distributed documentation', 'Mapping', 82], ['Tribal knowledge', 'Capturing', 68], ['Coverage gaps', 'Prioritized', 91]],
  },
  {
    number: '02', label: 'Context Assembly', eyebrow: '02. CONTEXT ASSEMBLY',
    title: 'Dynamically assemble all the context.',
    body: 'Every session pulls from durable company knowledge and the live conversation, creating a working context layer that is specific to your product, your voice, and your audience.',
    points: ['Content repository', 'In-session memory', 'Reusable context assembled at the moment of creation'],
    visual: 'context',
    pillars: [
      ['01', 'Company + Product', 'Positioning, product truth, proof, priorities'],
      ['02', 'Voice', 'Tone, vocabulary, principles, and constraints'],
      ['03', 'Audience', 'Needs, jobs, objections, and customer language'],
    ],
  },
  {
    number: '03', label: 'Content Creation', eyebrow: '03. CONTENT CREATION',
    title: 'Create with the whole context in the room.',
    body: 'We move from strategy to useful, on-brand assets without losing the product truth, audience nuance, or internal knowledge that makes the work credible.',
    points: ['Context-rich briefs and outlines', 'AI-assisted, human-shaped production', 'Enablement, education, and customer-facing assets'],
    visualLabel: 'CREATION PIPELINE',
    queue: [['Source-grounded brief', 'Ready', 100], ['Working draft', 'Creating', 72], ['Human review', 'Queued', 38]],
  },
  {
    number: '04', label: 'Monitoring + Learning', eyebrow: '04. MONITORING & LEARNING',
    title: 'Learn from what lands—and what does not.',
    body: 'We combine performance signals with feedback from customers and internal teams, then feed the learning back into Context so the next cycle starts smarter.',
    points: ['Performance and behavior signals', 'Customer, sales, and support feedback', 'Context updates and new hypotheses'],
    visualLabel: 'LEARNING SIGNALS',
    queue: [['Performance data', 'Monitoring', 100], ['Team feedback', 'Synthesizing', 76], ['Context update', 'Ready', 88]],
  },
  {
    number: '05', label: 'Maintenance', eyebrow: '05. MAINTENANCE',
    title: 'Keep the library useful as the business changes.',
    body: 'We maintain trust in the system through regular health checks—updating what still matters, repairing what has drifted, and retiring what no longer serves the strategy.',
    points: ['Retire content that no longer serves', 'Run scheduled content health checks', 'Update assets as product, market, and message change'],
    visualLabel: 'CONTENT HEALTH',
    queue: [['Health check', 'Recurring', 100], ['Update queue', 'Prioritized', 68], ['Retirement review', 'Scheduled', 54]],
  },
]

const offerings = [
  {
    label: 'Offering 02', title: 'SaaS Academy, Built from Scratch', price: '$10,000', duration: 'A complete academy foundation, built with you', featured: true,
    body: 'For SaaS teams ready to turn scattered product knowledge into a customer education destination. We design the academy around real roles and workflows, then build the structure, launch-ready modules, and operating rhythm from the ground up.',
    includes: ['Role-by-workflow curriculum architecture', 'Dual navigation and academy information design', 'Launch-ready atomic modules and templates', 'Governance, measurement, and handoff system'], cta: 'Book a free intro session',
  },
  {
    label: 'Offering 01', title: 'Content Clarity Audit', price: '$1,500', duration: 'A focused diagnostic and action plan',
    body: 'Find the content gaps, workflow friction, and highest-leverage opportunities before committing to a larger build.',
    includes: ['Source review and working session', 'Content and workflow diagnosis', 'Prioritized 30-day action map'], cta: 'Book a free intro session',
  },
  {
    label: 'Offering 03', title: 'Ongoing Monthly Partnership', price: '$2,000 / month', duration: 'A continuous education operations partner',
    body: 'Keep the academy useful after launch with an embedded partner who turns product changes and customer signals into a steady publishing rhythm.',
    includes: ['Monthly content production', 'Maintenance and optimization', 'Performance learning loop'], cta: 'Book a free intro session',
  },
]

const lifecycleStages = [
  { label: 'Marketing', Icon: RocketLaunch },
  { label: 'Sales', Icon: CurrencyDollar },
  { label: 'Implementation & Onboarding', Icon: UserCheck },
  { label: 'Product Adoption', Icon: Lightbulb },
  { label: 'Retention / Renewal', Icon: HandHeart },
  { label: 'Expansion', Icon: ArrowsOut },
  { label: 'Advocacy', Icon: Megaphone },
]

const contentProblems = [
  {
    number: '01',
    title: 'Manual Content Updates / Repurposing',
    body: 'Product changes require tedious multi-platform revisions—videos in an LMS, blogs in WordPress, and help-center articles in a support platform. Outdated references quickly create confusion and a poor customer experience.',
    Icon: PencilSimpleLine,
  },
  {
    number: '02',
    title: 'Scattered Educational Assets',
    body: 'Different assets are authored across different tools. One team may be managing four or five platforms, workflows, and licenses at once.',
    Icon: SquaresFour,
  },
  {
    number: '03',
    title: 'Resource Constraints',
    body: 'Smaller teams lack the headcount for continuous content creation, leaving opportunities on the table and pulling customer success and support away from strategic work.',
    Icon: UsersThree,
  },
  {
    number: '04',
    title: 'Lack of Strategy',
    body: 'Without a shared strategy, teams create one-off assets reactively. Priorities stay unclear, coverage gaps persist, and education cannot be connected to adoption, retention, or growth.',
    Icon: Strategy,
  },
]

function usePath() {
  const resourcePaths = ['/resources', '/resources/openai-enterprise-academy-teardown', '/resources/clearvu-iq']
  const normalizePath = (pathname) => pathname === '/case-study'
    ? '/resources'
    : resourcePaths.includes(pathname)
      ? pathname
      : '/'
  const [path, setPath] = useState(() => normalizePath(window.location.pathname))
  useEffect(() => {
    if (window.location.pathname !== path) window.history.replaceState({}, '', path)
    const onPopState = () => {
      const nextPath = normalizePath(window.location.pathname)
      if (window.location.pathname !== nextPath) window.history.replaceState({}, '', nextPath)
      setPath(nextPath)
    }
    window.addEventListener('popstate', onPopState)
    return () => window.removeEventListener('popstate', onPopState)
  }, [path])
  const navigate = (href) => {
    const target = new URL(href, window.location.origin)
    const targetPath = normalizePath(target.pathname)
    const targetHash = target.hash
    const targetUrl = `${targetPath}${targetHash}`
    const currentUrl = `${normalizePath(window.location.pathname)}${window.location.hash}`
    const scrollToTarget = () => {
      if (targetHash) document.getElementById(targetHash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
      else window.scrollTo({ top: 0, behavior: 'smooth' })
    }
    if (targetUrl === currentUrl) return scrollToTarget()
    window.history.pushState({}, '', targetUrl)
    if (targetPath !== path) {
      setPath(targetPath)
      if (!targetHash) window.scrollTo(0, 0)
      return
    }
    requestAnimationFrame(scrollToTarget)
  }
  return [path, navigate]
}

function AppLink({ href, navigate, className = '', children, onClick }) {
  return <a href={href} className={className} onClick={(event) => { event.preventDefault(); onClick?.(); navigate(href) }}>{children}</a>
}

function Header({ path, navigate, onBook }) {
  const [open, setOpen] = useState(false)
  useEffect(() => setOpen(false), [path])
  const onAnchorClick = (event) => {
    setOpen(false)
    if (path !== '/') return
    event.preventDefault()
    const target = new URL(event.currentTarget.href)
    window.history.pushState({}, '', `/${target.hash}`)
    document.getElementById(target.hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
  return (
    <header className={`site-header ${path === '/' ? 'site-header-home' : ''}`}>
      <div className="header-inner">
        <AppLink href="/" navigate={navigate} className="brand"><Circle size={10} weight="fill" /><strong>Metiful</strong></AppLink>
        <nav className="desktop-nav" aria-label="Main navigation">
          {headerNavItems.map((item) => item.anchor
            ? <a key={item.href} href={item.href} onClick={onAnchorClick}>{item.label}</a>
            : <AppLink key={item.href} {...item} navigate={navigate} className={path === item.href || (item.href === '/resources' && path.startsWith('/resources/')) ? 'active' : ''}>{item.label}</AppLink>)}
        </nav>
        <button className="button button-dark header-cta" onClick={onBook}>Let’s talk <ArrowUpRight size={14} weight="bold" /></button>
        <button className="mobile-menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <X size={22} /> : <List size={22} />}</button>
      </div>
      {open && <nav className="mobile-nav" aria-label="Mobile navigation">
        {headerNavItems.map((item) => item.anchor
          ? <a key={item.href} href={item.href} onClick={onAnchorClick}>{item.label}</a>
          : <AppLink key={item.href} {...item} navigate={navigate}>{item.label}</AppLink>)}
        <button className="button button-dark" onClick={onBook}>Let’s talk <ArrowUpRight size={14} /></button>
      </nav>}
    </header>
  )
}

function SectionLabel({ children }) { return <p className="section-label">{children}</p> }
function BookingButton({ onClick, children = 'Book a free intro session' }) {
  return <button className="button button-dark" onClick={onClick}>{children} <ArrowUpRight size={14} weight="bold" /></button>
}

function SystemVisual({ system }) {
  if (system.visual === 'context') {
    return <div className="context-document">
      <div className="context-document-header">
        <p className="micro-label">DYNAMIC CONTEXT DOCUMENT</p>
        <span>Assembled for this session</span>
      </div>
      <div className="context-pillars">
        {system.pillars.map(([number, title, detail]) => <article key={title}>
          <span>{number}</span>
          <h4>{title}</h4>
          <p>{detail}</p>
        </article>)}
      </div>
      <div className="context-sources">
        <div><span>Durable source</span><strong>Content repository</strong></div>
        <div><span>Live signal</span><strong>In-session memory</strong></div>
      </div>
    </div>
  }

  return <div className="queue-card">
    <p className="micro-label">{system.visualLabel}</p>
    {system.queue.map(([name, state, progress]) => <div className="queue-item" key={name}>
      <div><strong>{name}</strong><span>{state}</span></div>
      <div className="progress"><span style={{ width: `${progress}%` }} /></div>
    </div>)}
  </div>
}

function Home({ onBook }) {
  const [activeSystem, setActiveSystem] = useState(0)
  const system = systems[activeSystem]
  const activeService = ['Service 01', 'Service 02', 'Service 02 → Service 03', 'Service 02', 'Service 03'][activeSystem]
  useEffect(() => {
    const targetId = window.location.hash.slice(1)
    if (!targetId) return
    document.getElementById(targetId)?.scrollIntoView({ behavior: 'auto', block: 'start' })
  }, [])
  return <main>
    <section className="hero page-frame">
      <div className="hero-copy"><h1>We make <em>customer education</em> your growth drive.</h1></div>
      <div className="hero-bottom">
        <p>We help post-revenue SaaS teams audit, prioritize, and refresh product knowledge assets so customers, support, success, sales, and new users stay aligned with what the product actually does today.</p>
        <div className="hero-booking"><button className="hero-input" onClick={onBook}><span>What’s your work email?</span><span className="hero-input-cta">Book a free intro session <ArrowRight size={14} weight="bold" /></span></button><small>Built for teams whose product moves faster than their content system.</small></div>
      </div>
      <div className="hero-preview"><img src="/content-system-preview.png" alt="Metiful content system showing context assembly" /></div>
    </section>

    <section className="lifecycle-pressure-section" id="the-bottleneck" aria-label="The Bottleneck">
      <div className="page-frame lifecycle-pressure-grid">
        <article className="lifecycle-panel lifecycle-context-panel" id="context">
          <SectionLabel>THE CONTEXT</SectionLabel>
          <h2>Education drives growth across the customer lifecycle.</h2>
          <p>Every stage—from first touch to advocacy—benefits from intentional education.</p>
          <div className="lifecycle-orbit" role="list" aria-label="Customer lifecycle stages">
            <div className="diagram-dot-field" aria-hidden="true" />
            <div className="lifecycle-orbit-ring" aria-hidden="true" />
            <div className="lifecycle-orbit-core" aria-hidden="true"><Sparkle size={17} weight="duotone" /></div>
            <span className="lifecycle-orbit-tracer" aria-hidden="true"><Circle size={10} weight="fill" /></span>
            <div className="lifecycle-orbit-nodes">
              {lifecycleStages.map(({ label, Icon }, index) => <div className={`lifecycle-stage-node lifecycle-stage-node-${index + 1}`} style={{ '--stage-index': index, '--stage-angle': `${index * (360 / lifecycleStages.length)}deg`, '--stage-counter-angle': `${index * (-360 / lifecycleStages.length)}deg` }} role="listitem" key={label}>
                <div className="lifecycle-stage-anchor">
                  <div className="lifecycle-stage-icon"><Icon size={18} weight="regular" aria-hidden="true" /></div>
                  <span>{label}</span>
                </div>
              </div>)}
            </div>
          </div>
        </article>

        <article className="lifecycle-panel lifecycle-problems-panel" id="problems">
          <SectionLabel>THE BOTTLENECK</SectionLabel>
          <h2>Four forces keep customer education from scaling.</h2>
          <p>Even teams that know education matters hit the same walls.</p>
          <div className="problem-pressure-diagram" role="list" aria-label="Four forces that constrain customer education growth">
            <div className="diagram-dot-field" aria-hidden="true" />
            <span className="pressure-line pressure-line-north" aria-hidden="true" />
            <span className="pressure-line pressure-line-east" aria-hidden="true" />
            <span className="pressure-line pressure-line-south" aria-hidden="true" />
            <span className="pressure-line pressure-line-west" aria-hidden="true" />
            <div className="pressure-growth-core" aria-hidden="true"><TrendUp size={25} weight="duotone" /></div>
            {contentProblems.map(({ number, title, body, Icon }, index) => <div className={`problem-pressure-node problem-pressure-node-${index + 1}`} role="listitem" aria-label={`${title}. ${body}`} key={title}>
              <span className="problem-pressure-label"><small>{number}</small>{title}</span>
              <div className="problem-pressure-icon"><Icon size={20} weight="regular" aria-hidden="true" /></div>
            </div>)}
          </div>
        </article>
      </div>
    </section>

    <section className="offerings-section page-frame" id="our-offerings">
      <div className="offerings-heading"><div><SectionLabel>OUR OFFERINGS</SectionLabel><h2>Start with clarity. Build momentum when ready.</h2></div><p>Three ways to move from diagnosis, to a complete SaaS academy, to an education system that keeps getting better.</p></div>
      <div className="offering-grid">{offerings.map((offering) => <article className={`offering-card ${offering.featured ? 'offering-card-featured' : ''}`} key={offering.title}>
        <div className="offering-card-top"><p className="micro-label">{offering.label}</p>{offering.featured && <span className="featured-pill">Featured</span>}</div>
        <div className="offering-title-row"><h3>{offering.title}</h3><p className="offering-price">{offering.price}</p></div>
        <p className="offering-duration">{offering.duration}</p><p className="offering-body">{offering.body}</p><ul>{offering.includes.map((item) => <li key={item}><Check size={15} weight="bold" /> {item}</li>)}</ul><BookingButton onClick={onBook}>{offering.cta}</BookingButton>
      </article>)}</div>
    </section>

    <section className="system-section page-frame" id="how-we-solve-that">
      <SectionLabel>HOW WE SOLVE THAT</SectionLabel><h2>Human strategizing, AI scaling, Human gating</h2><p className="section-intro">Five stages, one living context system. Every result makes the next cycle smarter.</p>
      <div className="system-map-scroll">
        <div className="system-map">
          <div className="system-service-note system-service-note-1"><strong>Service 01</strong></div>
          <div className="system-service-note system-service-note-2"><strong>Service 02</strong></div>
          <div className="system-service-note system-service-note-3"><strong>Service 03</strong></div>
          <img className="system-map-scribble" src="/system-tabs-scribble.png?v=2" alt="" aria-hidden="true" />
          <div className="system-tabs" role="tablist" aria-label="Content velocity system">{systems.map((item, index) => <button key={item.label} id={`system-tab-${index}`} className={index === activeSystem ? 'active' : ''} onClick={() => setActiveSystem(index)} onKeyDown={(event) => {
            if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return
            event.preventDefault()
            const next = event.key === 'ArrowRight' ? (activeSystem + 1) % systems.length : (activeSystem - 1 + systems.length) % systems.length
            setActiveSystem(next)
            document.getElementById(`system-tab-${next}`)?.focus()
          }} role="tab" aria-selected={index === activeSystem} aria-controls="system-stage-panel" tabIndex={index === activeSystem ? 0 : -1}><span>{item.number}</span> {item.label}</button>)}</div>
        </div>
      </div>
      <div className="system-panel" id="system-stage-panel" role="tabpanel" aria-labelledby={`system-tab-${activeSystem}`} key={system.label}>
        <div className="system-copy"><div className="system-copy-meta"><p className="micro-label">{system.eyebrow}</p><span>{activeService}</span></div><h3>{system.title}</h3><p>{system.body}</p><ul>{system.points.map((point) => <li key={point}>{point}</li>)}</ul></div>
        <SystemVisual system={system} />
      </div>
    </section>

    <section className="service-system-section page-frame" id="service-system">
      <div className="service-system-heading">
        <SectionLabel>SYSTEM</SectionLabel>
        <h2>Delivered as a service. Designed as an operating system.</h2>
        <p>Start with a clear signal, build the academy, then keep the learning loop alive.</p>
        <div className="service-system-actions">
          <a className="button button-outline" href="#our-offerings">Explore the offerings <ArrowRight size={15} weight="bold" /></a>
          <BookingButton onClick={onBook}>Book a free intro session</BookingButton>
        </div>
      </div>
      <div className="service-map">
        <div className="scribble-diagram" aria-label="Four-circle service model: Circle 1 is the Content Clarity Audit; Circles 2 through 4 form the SaaS Academy build; Circle 3 continues into the ongoing monthly partnership.">
          <img src="/service-offerings-scribble.png" alt="Four overlapping pencil-scribble circles" />
          <div className="circle-label circle-label-1"><span>Circle 01</span><strong>Clarity audit</strong><small>$1,500</small></div>
          <div className="circle-label circle-label-2"><span>Circle 02</span><strong>Academy core</strong><small>Service 02</small></div>
          <div className="circle-label circle-label-3"><span>Circle 03</span><strong>Evolution loop</strong><small>02 → 03</small></div>
          <div className="circle-label circle-label-4"><span>Circle 04</span><strong>Launch + handoff</strong><small>Service 02</small></div>
        </div>
        <div className="service-map-legend">
          <p><span>01</span><strong>Service 01</strong> Content Clarity Audit</p>
          <p className="legend-featured"><span>02–04</span><strong>Service 02</strong> SaaS Academy, built from scratch · $10,000</p>
          <p><span>03</span><strong>Service 03</strong> Ongoing monthly partnership · $2,000/month</p>
        </div>
      </div>
    </section>

  </main>
}

function ResourceCard({ navigate, href, featured = false, eyebrow, title, summary, image, imageAlt, meta }) {
  return <AppLink href={href} navigate={navigate} className={`resource-card ${featured ? 'resource-card-featured' : ''}`}>
    <div className="resource-card-copy">
      <div className="resource-card-meta"><span>{eyebrow}</span><small>{meta}</small></div>
      <h2>{title}</h2>
      <p>{summary}</p>
      <span className="resource-card-link">Read resource <ArrowUpRight size={15} weight="bold" /></span>
    </div>
    <figure className="resource-card-image"><img src={image} alt={imageAlt} /></figure>
  </AppLink>
}

function Resources({ navigate }) {
  return <main className="resources-page">
    <section className="resources-hero page-frame">
      <div className="resources-heading">
        <div><SectionLabel>RESOURCES</SectionLabel><h1>Systems thinking for<br /><em>customer education.</em></h1></div>
        <p>Field notes, teardowns, and working examples for turning scattered product knowledge into education people can actually use.</p>
      </div>
      <div className="resources-count"><span>Latest thinking</span><small>02 resources</small></div>
      <div className="resource-grid">
        <ResourceCard
          navigate={navigate}
          href="/resources/openai-enterprise-academy-teardown"
          featured
          eyebrow="Learning from the best"
          meta="Enterprise teardown · 8 min read"
          title="OpenAI Enterprise Academy Teardown"
          summary="A 264-item content crawl reveals where the Academy supports enterprise adoption—and where the path to measurable capability can become clearer."
          image="/case-studies/openai-academy-content.png"
          imageAlt="OpenAI Academy content library with collections, filters, and learning cards"
        />
        <ResourceCard
          navigate={navigate}
          href="/resources/clearvu-iq"
          eyebrow="Field work"
          meta="0→1 system · 6 min read"
          title="ClearVu-IQ: Building an education system from scratch"
          summary="How a role-by-workflow map, dual navigation, and atomic modules reduced founder-led support volume by roughly 40%."
          image="/case-studies/clearvu-role-map.png"
          imageAlt="ClearVu-IQ role-by-workflow content map"
        />
      </div>
    </section>
  </main>
}

function ResourceArticleHero({ navigate, eyebrow, title, summary, meta, image, imageAlt }) {
  return <header className="resource-article-hero page-frame">
    <AppLink href="/resources" navigate={navigate} className="resource-back"><ArrowRight size={14} /> All resources</AppLink>
    <div className="resource-article-title">
      <p className="micro-label">{eyebrow}</p>
      <h1>{title}</h1>
      <p className="resource-article-dek">{summary}</p>
      <div className="resource-article-meta">{meta.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
    </div>
    <figure className="resource-article-cover"><img src={image} alt={imageAlt} /></figure>
  </header>
}

function OpenAIResource({ navigate, onBook }) {
  const academyStages = [
    {
      stage: 'Access', status: 'Mixed', tone: 'mixed',
      question: 'Can admins deploy access safely and govern it for their context?',
      evidence: '29 rollout-playbook assets cover SCIM, team invites, launch planning, controls, and communications.',
      gap: 'Industry-specific governance guidance remains thin.',
    },
    {
      stage: 'Activation', status: 'Mixed', tone: 'mixed',
      question: 'Who is using it, and how do different roles get to first value?',
      evidence: 'Workspace analytics guidance is present, plus a growing set of audience-specific collections.',
      gap: 'Change-management curriculum and role-based learning paths are not yet a coherent system.',
    },
    {
      stage: 'Repeat usage', status: 'Strong', tone: 'strong',
      question: 'Are people building skill and applying AI to repeatable work?',
      evidence: '76 end-user enablement assets, 41 stories, and champion resources make this the deepest layer.',
      gap: 'The ingredients are strong; navigation still asks users to assemble the pathway themselves.',
    },
    {
      stage: 'Business outcome', status: 'Gap', tone: 'gap',
      question: 'Can leaders connect learning to capability and measurable impact?',
      evidence: 'Eight measurement assets include analytics, ROI guidance, and baseline / impact surveys.',
      gap: 'Causal attribution and competency verification remain the clearest opportunity.',
    },
  ]

  return <main className="resource-article resource-openai">
    <ResourceArticleHero
      navigate={navigate}
      eyebrow="LEARNING FROM THE BEST · ENTERPRISE TEARDOWN"
      title={<>OpenAI Enterprise<br />Academy Teardown</>}
      summary="I crawled the Academy’s public content ecosystem, classified what each asset helps an enterprise team do, and mapped the findings to four stages of AI adoption."
      meta={[["Scope", "264 public records"], ["Lens", "Enterprise adoption"], ["Read", "8 minutes"]]}
      image="/case-studies/openai-academy-content.png"
      imageAlt="OpenAI Academy public content library"
    />

    <article className="resource-article-body">

      <section className="academy-crawl page-frame">
        <div className="case-section-heading">
          <p className="micro-label">01A / START WITH THE CRAWL</p>
          <h3>Before recommending more content, understand what the system already contains.</h3>
        </div>
        <div className="academy-crawl-grid">
          <figure className="case-image-frame academy-screen">
            <img src="/case-studies/openai-academy-content.png" alt="OpenAI Academy content library showing collections, filters, and content cards" />
            <figcaption>Academy content library · source-system review</figcaption>
          </figure>
          <div className="crawl-results">
            <div className="crawl-stat"><strong>264</strong><span>public content records inventoried</span></div>
            <div className="crawl-stat"><strong>9</strong><span>formats across resources, events, videos, blogs, collections, and more</span></div>
            <div className="crawl-stat"><strong>12</strong><span>strategic relevance categories, with 40 records flagged for classification</span></div>
            <div className="crawl-method"><p className="micro-label">CLASSIFICATION LENS</p><p>Each item was tagged by format, audience or community, admin relevance, and the adoption job it could support.</p></div>
          </div>
        </div>
      </section>

      <section className="academy-patterns page-frame">
        <div className="case-section-heading compact">
          <p className="micro-label">01B / FIND THE SHAPE</p>
          <h3>The library is deepest where people are already learning and applying.</h3>
        </div>
        <div className="pattern-grid">
          {[
            ['76', 'End-user enablement', 'The largest cluster: foundations, prompting, workflows, and product skills.'],
            ['41', 'Stories', 'Proof and inspiration across roles, industries, and real-world use cases.'],
            ['29', 'Rollout playbook', 'Admin resources for launch, access, controls, communications, and champions.'],
            ['8', 'Measurement', 'Analytics, surveys, and ROI resources—the smallest strategic layer.'],
          ].map(([count, title, body]) => <article key={title}><strong>{count}</strong><h4>{title}</h4><p>{body}</p></article>)}
        </div>
        <figure className="case-image-frame academy-community-screen">
          <img src="/case-studies/openai-academy-communities.png" alt="OpenAI Academy specialized community tracks for work users, admins, champions, builders, and education audiences" />
          <figcaption>Specialized tracks make audience segmentation visible, but do not yet create a complete adoption journey.</figcaption>
        </figure>
      </section>

      <section className="academy-stage-section">
        <div className="page-frame academy-stage-inner">
          <div className="stage-heading">
            <div><p className="micro-label">01C / MAP TO THE JOURNEY</p><h3>What does an enterprise adoption lead need at each stage?</h3></div>
            <p>The crawl becomes useful when inventory volume is translated into the questions a real owner is trying to answer.</p>
          </div>
          <div className="stage-map" role="table" aria-label="OpenAI Academy content mapped to enterprise adoption stages">
            <div className="stage-map-head" role="row"><span>Stage</span><span>Adoption question</span><span>Evidence in the Academy</span><span>Opportunity</span><span>Status</span></div>
            {academyStages.map((item) => <article className="stage-row" role="row" key={item.stage}>
              <h4>{item.stage}</h4><p>{item.question}</p><p>{item.evidence}</p><p>{item.gap}</p><span className={`stage-status ${item.tone}`}>{item.status}</span>
            </article>)}
          </div>
        </div>
      </section>

      <section className="academy-conclusion page-frame">
        <div className="conclusion-label"><span>Conclusion</span><span>01 / 02</span></div>
        <blockquote>The Academy is strongest once adoption is moving. Its next unlock is to become the operating system that moves an enterprise from access to measurable capability.</blockquote>
        <div className="conclusion-grid">
          <p><strong>Protect the strength.</strong> Keep expanding practical enablement, champions content, and role-relevant examples.</p>
          <p><strong>Connect the middle.</strong> Package assets into stage-led pathways instead of asking users to assemble a journey from tags and collections.</p>
          <p><strong>Close the loop.</strong> Add competency assessment and stronger attribution so learning can be connected to business outcomes.</p>
        </div>
      </section>
    </article>

    <CTASection onBook={onBook} heading="Need a content ecosystem mapped to the way customers adopt?" />
  </main>
}

function ClearVuResource({ navigate, onBook }) {
  return <main className="resource-article resource-clearvu">
    <ResourceArticleHero
      navigate={navigate}
      eyebrow="FIELD WORK · 0→1 ENABLEMENT SYSTEM"
      title="ClearVu-IQ: Building an education system from scratch"
      summary="An AI-powered linen-management startup was relying on founder-led support. I built a role-based, update-ready education system users could navigate by job or workflow."
      meta={[["Company", "Healthcare SaaS"], ["Build", "30 days"], ["Impact", "~40% fewer support calls"]]}
      image="/case-studies/clearvu-role-map.png"
      imageAlt="ClearVu-IQ role-by-workflow map"
    />

    <article className="resource-article-body clearvu-project">

      <section className="clearvu-impact page-frame">
        <div className="impact-stat"><strong>5</strong><span>User roles mapped</span></div>
        <div className="impact-stat"><strong>45</strong><span>Artifacts shipped</span></div>
        <div className="impact-stat"><strong>30d</strong><span>From map to launch</span></div>
        <div className="impact-stat highlight"><strong>~40%</strong><span>Support volume reduction</span></div>
      </section>

      <section className="clearvu-problem page-frame">
        <div><p className="micro-label">THE SYSTEM PROBLEM</p><h3>Five roles. Dozens of workflows. About 20 client calls landing on the founder every day.</h3></div>
        <p>Clinical staff, supply-chain teams, administrators, linen suppliers, and environmental services all needed different slices of the product. A feature-first help center would simply reproduce the complexity. The architecture had to start with the work each role came to do.</p>
      </section>

      <section className="clearvu-process page-frame">
        {[
          ['01', 'Map role × functionality', 'Turn product knowledge into a coverage map before producing anything.', '/case-studies/clearvu-role-map.png'],
          ['02', 'Offer two ways in', 'Let users browse by their role or jump directly to a product function.', '/case-studies/clearvu-navigation.png'],
          ['03', 'Build atomic modules', 'Keep every lesson short, single-task, and swappable when the product changes.', '/case-studies/clearvu-atomic-modules.png'],
        ].map(([number, title, body, image]) => <article className="clearvu-step" key={number}>
          <div className="clearvu-step-copy"><span>{number}</span><h3>{title}</h3><p>{body}</p></div>
          <figure className="case-image-frame"><img src={image} alt={`ClearVu-IQ work sample: ${title}`} /></figure>
        </article>)}
      </section>

      <section className="clearvu-outcome">
        <div className="page-frame clearvu-outcome-inner">
          <p className="micro-label">THE OUTCOME</p>
          <h3>Not just a help center. An update-ready education architecture.</h3>
          <div className="clearvu-outcome-grid">
            <p>When a feature changed, the team could replace one atomic module instead of re-recording an entire walkthrough.</p>
            <p>In-product tutorials, knowledge-base articles, and live training all drew from the same role × workflow structure.</p>
            <a className="button button-outline light" href="https://www.youtube.com/watch?v=tT4M0SrOkHM" target="_blank" rel="noreferrer">Watch demo trailer <ArrowUpRight size={14} weight="bold" /></a>
          </div>
        </div>
      </section>
    </article>

    <CTASection onBook={onBook} heading="Need scattered knowledge to become a system people can use?" />
  </main>
}

function CTASection({ onBook, heading }) { return <section className="cta-section page-frame"><h2>{heading}</h2><BookingButton onClick={onBook} /></section> }

function Footer({ navigate, onBook }) {
  return <footer className="site-footer page-frame"><div className="footer-main"><div><h2>Keep your content velocity on par with your product velocity.</h2><BookingButton onClick={onBook} /></div><nav aria-label="Footer navigation"><p className="micro-label">NAVIGATE</p>{navItems.map((item) => <AppLink key={item.href} {...item} navigate={navigate}>{item.label}</AppLink>)}</nav></div><div className="footer-bottom"><span>AI-assisted content operations for fast-shipping B2B SaaS teams.</span><span>© 2026 Metiful. All rights reserved.</span></div></footer>
}

function BookingModal({ open, onClose }) {
  useEffect(() => {
    if (!open) return
    const onKeyDown = (event) => event.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKeyDown); document.body.classList.add('modal-open')
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.classList.remove('modal-open') }
  }, [open, onClose])
  useEffect(() => {
    if (!open) return
    ;(async () => {
      const cal = await getCalApi({ namespace: 'metiful-strategy-call' })
      cal('ui', {
        theme: 'light',
        styles: { branding: { brandColor: '#101413' } },
        hideEventTypeDetails: false,
        layout: 'month_view',
      })
    })()
  }, [open])
  if (!open) return null
  return <div className="booking-backdrop" role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}><section className="booking-modal" role="dialog" aria-modal="true" aria-labelledby="booking-title"><button className="booking-close" aria-label="Close booking" onClick={onClose}><X size={21} /></button><div className="booking-copy"><div><SectionLabel>BOOK A STRATEGY CALL</SectionLabel><h2 id="booking-title">Let’s find the content work that matters.</h2><p>A focused 30-minute conversation about where product knowledge is drifting—and the smallest useful way to fix it.</p><ul><li><Check size={16} weight="bold" /> Map the visible content gap</li><li><Check size={16} weight="bold" /> Identify the highest-impact starting point</li><li><Check size={16} weight="bold" /> Leave with a clear next step</li></ul></div><small>No pitch deck. No pressure. Just a useful working conversation.</small></div><div className="booking-calendar"><Cal namespace="metiful-strategy-call" calLink={CALENDAR_LINK} style={{ width: '100%', height: '100%', overflow: 'auto' }} config={{ layout: 'month_view', theme: 'light' }} /></div></section></div>
}

export function App() {
  const [path, navigate] = usePath()
  const [bookingOpen, setBookingOpen] = useState(() => new URLSearchParams(window.location.search).get('booking') === '1')
  const openBooking = () => setBookingOpen(true)
  const page = useMemo(() => {
    if (path === '/resources') return <Resources navigate={navigate} />
    if (path === '/resources/openai-enterprise-academy-teardown') return <OpenAIResource navigate={navigate} onBook={openBooking} />
    if (path === '/resources/clearvu-iq') return <ClearVuResource navigate={navigate} onBook={openBooking} />
    return <Home onBook={openBooking} />
  }, [path])
  useEffect(() => {
    const titles = {
      '/resources': 'Resources — Metiful',
      '/resources/openai-enterprise-academy-teardown': 'OpenAI Enterprise Academy Teardown — Metiful',
      '/resources/clearvu-iq': 'ClearVu-IQ Education System — Metiful',
    }
    document.title = titles[path] || 'Metiful — Content Velocity for B2B SaaS'
  }, [path])
  return <><Header path={path} navigate={navigate} onBook={openBooking} />{page}<Footer navigate={navigate} onBook={openBooking} /><BookingModal open={bookingOpen} onClose={() => setBookingOpen(false)} /></>
}
