import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react'
import { ArrowDown, ArrowUpRight, Menu, X } from 'lucide-react'

const sections = [
  { id: 'introduction', label: 'Introduction' },
  { id: 'about', label: 'About' },
  { id: 'concepts', label: 'AI / ML' },
  { id: 'python', label: 'Python' },
  { id: 'demonstrations', label: 'Demonstrations' },
  { id: 'teaching', label: 'Teaching' },
]

const projects = [
  {
    number: '01',
    title: 'Reading a small dataset',
    note: 'A data exploration demonstration',
    tools: 'Python · sample values',
    visual: 'dataset',
  },
  {
    number: '02',
    title: 'Pattern or not?',
    note: 'A classification concept demonstration',
    tools: 'Features · labels · model',
    visual: 'classification',
  },
  {
    number: '03',
    title: 'From input to estimate',
    note: 'A prediction workflow demonstration',
    tools: 'Training · evaluation · output',
    visual: 'workflow',
  },
]

function Reveal({ children, className = '', delay = 0, y = 22 }: { children: ReactNode; className?: string; delay?: number; y?: number }) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -9% 0px' }}
      transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function SiteNav() {
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    let thresholdY = window.scrollY
    let frame = 0
    const onScroll = () => {
      if (frame) return
      frame = window.requestAnimationFrame(() => {
        const y = window.scrollY
        setScrolled(y > 20)
        if (y < 80) {
          setHidden(false)
          thresholdY = y
        } else if (Math.abs(y - thresholdY) >= 14) {
          setHidden(y > thresholdY)
          thresholdY = y
        }
        frame = 0
      })
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('scroll', onScroll)
      if (frame) window.cancelAnimationFrame(frame)
    }
  }, [])

  const closeMenu = () => setOpen(false)

  return (
    <header className={`site-nav${hidden && !open ? ' is-hidden' : ''}${scrolled ? ' is-scrolled' : ''}`}>
      <a className="wordmark" href="#top" onClick={closeMenu} aria-label="Nisam, return to top">Y<span>.</span></a>
      <nav className={`nav-links${open ? ' is-open' : ''}`} aria-label="Main navigation">
        {sections.map((section, index) => (
          <a href={`#${section.id}`} key={section.id} onClick={closeMenu}>
            <span className="nav-number">0{index + 1}</span>{section.label}
          </a>
        ))}
        <a className="nav-contact" href="#contact" onClick={closeMenu}>Contact <ArrowUpRight size={13} aria-hidden="true" /></a>
      </nav>
      <button className="menu-toggle" type="button" aria-label={open ? 'Close navigation' : 'Open navigation'} aria-expanded={open} onClick={() => setOpen(!open)}>
        {open ? <X size={20} /> : <Menu size={20} />}
      </button>
    </header>
  )
}

function SectionLabel({ number, children, light = false }: { number: string; children: ReactNode; light?: boolean }) {
  return <div className={`section-label${light ? ' section-label-light' : ''}`}><span>{number} /</span>{children}</div>
}

function Hero() {
  const reduced = useReducedMotion()
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero-topline"><span>EDUCATION · ARTIFICIAL INTELLIGENCE</span><span>PORTFOLIO / 2026</span></div>
      <div className="hero-title-wrap">
        <div className="hero-kicker">TEACHER <span className="blue-dot" /> AI · ML · PYTHON</div>
        <h1 id="hero-title" className="hero-title">
          <span className="hero-line"><motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: reduced ? 0 : 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}>Nisam</motion.span></span>
          <span className="hero-line hero-line-second"><motion.span initial={reduced ? false : { y: '110%' }} animate={{ y: 0 }} transition={{ duration: reduced ? 0 : 1, delay: 0.23, ease: [0.22, 1, 0.36, 1] }}>teaches<span className="hero-period">.</span></motion.span></span>
        </h1>
      </div>
      <div className="hero-bottom">
        <p className="hero-intro">Making artificial intelligence<br />a little more <em>understandable.</em></p>
        <p className="hero-context">A teacher associated with the Diploma in Artificial Intelligence field, exploring ideas in machine learning and Python.</p>
        <a href="#introduction" className="scroll-cue"><span>SCROLL TO EXPLORE</span><span className="scroll-cue-icon"><ArrowDown size={15} /></span></a>
      </div>
      <div className="hero-index" aria-hidden="true">01—08</div>
    </section>
  )
}

function Introduction() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['2%', '-7%'])
  return (
    <section ref={ref} className="intro-section section-paper" id="introduction" aria-labelledby="intro-title">
      <div className="section-inner">
        <SectionLabel number="01">A starting point</SectionLabel>
        <div className="intro-layout">
          <div className="intro-head-wrap"><motion.h2 id="intro-title" className="intro-head" style={reduced ? undefined : { x }}>What is<br />intelligence<span className="blue-period">?</span></motion.h2></div>
          <Reveal className="intro-copy" delay={0.12}>
            <p className="copy-index">A QUESTION, NOT A BLACK BOX <span>—</span> 01</p>
            <p className="intro-statement">Artificial intelligence is a way of building systems that perform tasks we associate with human intelligence.</p>
            <p className="body-copy">Machine learning is one approach within AI: give a model examples, let it find patterns, then test how well those patterns help it respond to something new.</p>
          </Reveal>
        </div>
        <div className="intro-footnote"><span>INPUT</span><span className="fine-line"/><span>PATTERN</span><span className="fine-line"/><span>OUTPUT</span><span className="intro-formula">data → learning → decision</span></div>
      </div>
    </section>
  )
}

function About() {
  return (
    <section className="about-section section-ink" id="about" aria-labelledby="about-title">
      <div className="section-inner">
        <SectionLabel number="02" light>About Nisam</SectionLabel>
        <div className="about-layout">
          <div className="about-display">
            <Reveal><p className="about-eyebrow">A LITTLE ABOUT THE PERSON BEHIND THE LESSONS</p></Reveal>
            <h2 id="about-title" className="about-head"><span>Curious</span><span className="about-head-muted">by nature.</span></h2>
            <div className="about-mark" aria-hidden="true">Y.</div>
          </div>
          <div className="about-details">
            <Reveal delay={0.14}>
              <p className="about-role">Teacher<br /><span>Diploma in Artificial Intelligence</span></p>
              <p className="about-bio">I teach in the Diploma in Artificial Intelligence field, with a focus on AI, Machine Learning, and Python.</p>
            </Reveal>
            <div className="editable-facts">
              <Reveal delay={0.22}><Fact label="AREAS OF INTEREST" value="AI · Machine Learning · Python" /></Reveal>
              <Reveal delay={0.3}><Fact label="EDUCATION" value="[Add educational background, if you would like it included.]" /></Reveal>
              <Reveal delay={0.38}><Fact label="EXPERIENCE" value="[Add relevant experience, if you would like it included.]" /></Reveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Fact({ label, value }: { label: string; value: string }) {
  return <div className="fact"><span>{label}</span><p>{value}</p></div>
}

function Concepts() {
  const concepts = [
    { symbol: '01', title: 'Artificial intelligence', detail: 'The wider field: systems designed to carry out tasks associated with intelligence.' },
    { symbol: '02', title: 'Machine learning', detail: 'A way for a system to learn patterns from examples rather than follow only hand-written rules.' },
    { symbol: '03', title: 'Evaluation', detail: 'A check against unseen examples helps show whether a learned pattern is useful.' },
  ]
  return (
    <section className="concept-section section-blue" id="concepts" aria-labelledby="concept-title">
      <div className="section-inner">
        <SectionLabel number="03">Ideas in relationship</SectionLabel>
        <div className="concept-heading">
          <Reveal><p className="micro-label">A SIMPLE MAP OF THE FIELD</p></Reveal>
          <h2 id="concept-title" className="concept-title">AI<span className="concept-slash">/</span><span className="concept-ml">ML</span></h2>
          <Reveal className="concept-lede" delay={0.14}><p>Not magic. A set of ideas, methods, and questions—each building on the one before.</p></Reveal>
        </div>
        <div className="concept-map" aria-label="Artificial intelligence includes machine learning, which learns patterns from data and is evaluated on examples it has not seen">
          <div className="map-topline"><span>THE LEARNING LOOP</span><span>CONCEPT / 001</span></div>
          <div className="map-flow">
            <div className="map-node map-data"><span className="node-label">01 / EXAMPLES</span><div className="data-glyph" aria-hidden="true"><i/><i/><i/><i/><i/><i/><i/><i/><i/></div><strong>Data</strong><small>observations</small></div>
            <div className="map-connector" aria-hidden="true"><span>patterns</span><i/></div>
            <div className="map-node map-model"><span className="node-label">02 / LEARNING</span><div className="model-glyph" aria-hidden="true"><i/><i/><i/><i/><i/></div><strong>Model</strong><small>learned pattern</small></div>
            <div className="map-connector map-connector-last" aria-hidden="true"><span>test & refine</span><i/></div>
            <div className="map-node map-output"><span className="node-label">03 / RESULT</span><div className="output-glyph" aria-hidden="true"><b/><b/><b/></div><strong>Prediction</strong><small>check the answer</small></div>
          </div>
          <div className="map-foot"><span>TRAIN ON EXAMPLES</span><span>↓</span><span>TEST ON UNSEEN DATA</span><span>↻</span><span>LEARN, EVALUATE, REPEAT</span></div>
        </div>
        <div className="concept-definitions">
          {concepts.map((item, index) => <Reveal key={item.symbol} delay={index * 0.08}><article className="definition"><span>{item.symbol}</span><h3>{item.title}</h3><p>{item.detail}</p></article></Reveal>)}
        </div>
      </div>
    </section>
  )
}

function Python() {
  const lines = [
    { number: '01', code: <><span className="syntax-name">scores</span> <span className="syntax-muted">=</span> [<span className="syntax-num">72</span>, <span className="syntax-num">88</span>, <span className="syntax-num">91</span>, <span className="syntax-num">67</span>]</> },
    { number: '02', code: <><span className="syntax-name">average</span> <span className="syntax-muted">=</span> <span className="syntax-fn">sum</span>(scores) / <span className="syntax-fn">len</span>(scores)</> },
    { number: '03', code: <><span className="syntax-key">print</span>(<span className="syntax-fn">round</span>(average, <span className="syntax-num">1</span>))</> },
  ]
  return (
    <section className="python-section section-paper" id="python" aria-labelledby="python-title">
      <div className="section-inner">
        <SectionLabel number="04">A language for learning</SectionLabel>
        <div className="python-layout">
          <div className="python-copy">
            <Reveal><p className="micro-label">PYTHON / A FIRST TOOL</p></Reveal>
            <h2 id="python-title" className="python-title">Ideas,<br /><em>in practice.</em></h2>
            <Reveal delay={0.14}><p className="body-copy python-description">Python gives learners a readable way to explore data, express a small idea, and see what a model returns. Start with a few values; ask a better question next.</p></Reveal>
            <Reveal delay={0.2}><p className="python-note"><span className="blue-dot"/> A TINY, VALID EXAMPLE — CALCULATE A MEAN</p></Reveal>
          </div>
          <div className="code-composition">
            <Reveal className="code-sheet">
              <div className="code-topline"><span>PYTHON / 001</span><span>INPUT → SUMMARY</span></div>
              <div className="code-lines" aria-label="Python example: calculate the average of four scores">
                {lines.map((line, index) => <motion.div key={line.number} className="code-line" initial={{ opacity: 0, x: 14 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.12, duration: 0.55 }}><span>{line.number}</span><code>{line.code}</code></motion.div>)}
              </div>
              <div className="code-output"><span>OUTPUT</span><strong>79.5</strong><small>mean score</small></div>
            </Reveal>
            <div className="python-side-note" aria-hidden="true"><span>72</span><i/><span>88</span><i/><span>91</span><i/><span>67</span></div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProjectArtwork({ type }: { type: string }) {
  if (type === 'dataset') return <div className="art-dataset" aria-label="Sample bar chart comparing four values: 72, 88, 91 and 67"><div className="chart-caption"><span>SAMPLE SCORES</span><span>n = 04</span></div><div className="bars">{[{ n: '72', h: '68%' }, { n: '88', h: '84%' }, { n: '91', h: '88%' }, { n: '67', h: '63%' }].map((bar, i) => <div className="bar-column" key={bar.n}><span>{bar.n}</span><i style={{ height: bar.h, transitionDelay: `${i * 80}ms` }}/><small>0{i + 1}</small></div>)}</div><div className="chart-axis"><span>VALUE</span><span>OBSERVATION</span></div></div>
  if (type === 'classification') return <div className="art-classification" aria-label="Concept diagram showing two labelled groups of data points"><div className="plot-axis-x"/><div className="plot-axis-y"/><div className="plot-label plot-label-a">GROUP A</div><div className="plot-label plot-label-b">GROUP B</div>{[[24, 65], [31, 53], [39, 72], [46, 61], [55, 47], [62, 32], [69, 55], [75, 23], [83, 41], [88, 30], [19, 80], [58, 76]].map(([left, top], i) => <i key={i} className={`plot-point ${i < 5 ? 'point-a' : 'point-b'}`} style={{ left: `${left}%`, top: `${top}%` }}/>) }<div className="decision-line"/><span className="plot-caption">FEATURE 01 × FEATURE 02</span></div>
  return <div className="art-workflow" aria-label="Sample workflow: examples are split into training and test sets, a model learns from training data, then its result is evaluated"><div className="workflow-step"><span>01</span><strong>Examples</strong><small>input data</small></div><i className="workflow-arrow">→</i><div className="workflow-step workflow-model"><span>02</span><strong>Learn</strong><small>fit a model</small></div><i className="workflow-arrow">→</i><div className="workflow-step"><span>03</span><strong>Evaluate</strong><small>test the result</small></div><div className="workflow-foot">TRAIN / TEST / IMPROVE</div></div>
}

function Demonstrations() {
  return (
    <section className="projects-section section-ink" id="demonstrations" aria-labelledby="projects-title">
      <div className="section-inner">
        <SectionLabel number="05" light>Selected demonstrations</SectionLabel>
        <div className="projects-heading">
          <h2 id="projects-title" className="projects-title">Ideas made<br /><span>visible.</span></h2>
          <Reveal className="projects-disclaimer" delay={0.16}><span className="demo-stamp">DEMONSTRATIONS<br />NOT CLIENT WORK</span><p>Learning examples and concepts to replace with Nisam’s actual projects when ready.</p></Reveal>
        </div>
        <div className="project-list">
          {projects.map((project, index) => <Project key={project.number} project={project} index={index}/>) }
        </div>
      </div>
    </section>
  )
}

function Project({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const reverse = index === 1
  return (
    <article className={`project-row project-row-${project.visual}${reverse ? ' project-reverse' : ''}`}>
      <Reveal className="project-art" delay={0.06}><ProjectArtwork type={project.visual}/></Reveal>
      <Reveal className="project-info" delay={0.16} y={15}>
        <div className="project-meta"><span>{project.number} / 03</span><span>DEMONSTRATION</span></div>
        <h3>{project.title}</h3>
        <p>{project.note}</p>
        <div className="project-bottom"><span>{project.tools}</span><span className="project-arrow" aria-hidden="true"><ArrowUpRight size={17}/></span></div>
      </Reveal>
    </article>
  )
}

function Teaching() {
  return (
    <section className="teaching-section section-paper" id="teaching" aria-labelledby="teaching-title">
      <div className="section-inner">
        <SectionLabel number="06">Teaching & learning</SectionLabel>
        <div className="teaching-layout">
          <div className="teaching-side"><Reveal><p className="micro-label">A SPACE FOR Nisam’S VOICE</p></Reveal><div className="teaching-rule"/><Reveal delay={0.16}><p className="small-copy">This section is a clearly marked draft—not a claim about classroom practices.</p></Reveal></div>
          <div className="teaching-main"><h2 id="teaching-title">A teaching<br /><em>approach.</em></h2><Reveal delay={0.15}><p className="teaching-placeholder">[Add Nisam’s approved description of how she teaches and supports learning.]</p></Reveal><Reveal delay={0.24}><div className="teaching-topics"><span>FOUNDATIONS</span><span>EXAMPLES</span><span>EXPLORATION</span><span>— EDITABLE TOPICS —</span></div></Reveal></div>
        </div>
      </div>
    </section>
  )
}

function Contact() {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [24, -24])
  return (
    <section ref={ref} className="contact-section" id="contact" aria-labelledby="contact-title">
      <div className="section-inner contact-inner">
        <SectionLabel number="07">A final note</SectionLabel>
        <motion.div className="contact-copy" style={reduced ? undefined : { y }}>
          <Reveal><p className="micro-label">HAVE A QUESTION OR AN IDEA?</p></Reveal>
          <h2 id="contact-title">Let’s talk<span>.</span></h2>
        </motion.div>
        <div className="contact-bottom"><Reveal delay={0.16}><p>[Add Nisam’s preferred email or professional contact link.]</p></Reveal><span className="contact-index">Nisam · AI / ML / PYTHON<br/>ONE PAGE, MANY QUESTIONS.</span></div>
      </div>
    </section>
  )
}

function SiteFooter() {
  return <footer className="site-footer"><a href="#top" className="footer-mark">Y.</a><span>TEACHING THE QUESTIONS BEHIND THE CODE</span><a href="#top" className="back-top">BACK TO TOP ↑</a><small>© {new Date().getFullYear()} Nisam</small></footer>
}

export function App() {
  return (
    <>
      <a className="skip-link" href="#main-content">Skip to content</a>
      <SiteNav />
      <main id="main-content">
        <Hero />
        <Introduction />
        <About />
        <Concepts />
        <Python />
        <Demonstrations />
        <Teaching />
        <Contact />
      </main>
      <SiteFooter />
    </>
  )
}
