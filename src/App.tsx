import './App.css'
import { Button } from '@/components/ui/button'

function App() {
  return (
    <main className="base-style-page">
      <header className="page-header">
        <p className="section-title body-2">Font</p>
        <h1 className="headline-2">Typography Base Style</h1>
        <p className="inline-flex w-fit rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
          Tailwind is working
        </p>
      </header>

      <section className="type-section" aria-labelledby="base-colors-section">
        <h2 id="base-colors-section" className="section-title body-2">
          Base Colors
        </h2>
        <article className="color-grid">
          <div className="color-card">
            <div className="color-swatch brown-600" aria-label="Brown 600 swatch"></div>
            <p className="body-2 color-name">Brown 600</p>
            <p className="body-3 color-hex">#26231E</p>
          </div>
          <div className="color-card">
            <div className="color-swatch brown-500" aria-label="Brown 500 swatch"></div>
            <p className="body-2 color-name">Brown 500</p>
            <p className="body-3 color-hex">#434038</p>
          </div>
          <div className="color-card">
            <div className="color-swatch brown-400" aria-label="Brown 400 swatch"></div>
            <p className="body-2 color-name">Brown 400</p>
            <p className="body-3 color-hex">#75716B</p>
          </div>
          <div className="color-card">
            <div className="color-swatch brown-300" aria-label="Brown 300 swatch"></div>
            <p className="body-2 color-name">Brown 300</p>
            <p className="body-3 color-hex">#DAD6D1</p>
          </div>
          <div className="color-card">
            <div className="color-swatch brown-200" aria-label="Brown 200 swatch"></div>
            <p className="body-2 color-name">Brown 200</p>
            <p className="body-3 color-hex">#EFEEEB</p>
          </div>
          <div className="color-card">
            <div className="color-swatch brown-100" aria-label="Brown 100 swatch"></div>
            <p className="body-2 color-name">Brown 100</p>
            <p className="body-3 color-hex">#F9F8F6</p>
          </div>
          <div className="color-card">
            <div className="color-swatch white" aria-label="White swatch"></div>
            <p className="body-2 color-name">White</p>
            <p className="body-3 color-hex">#FFFFFF</p>
          </div>
        </article>
      </section>

      <section className="type-section" aria-labelledby="brand-colors-section">
        <h2 id="brand-colors-section" className="section-title body-2">
          Brand Colors
        </h2>
        <article className="color-grid brand-grid">
          <div className="color-card">
            <div className="color-swatch orange" aria-label="Orange swatch"></div>
            <p className="body-2 color-name">Orange</p>
            <p className="body-3 color-hex">#F2B68C</p>
          </div>
          <div className="color-card">
            <div className="color-swatch green" aria-label="Green swatch"></div>
            <p className="body-2 color-name">Green</p>
            <p className="body-3 color-hex">#12B279</p>
          </div>
          <div className="color-card">
            <div className="color-swatch mint" aria-label="Mint swatch"></div>
            <p className="body-2 color-name">Green</p>
            <p className="body-3 color-hex">#D7F2E9</p>
          </div>
          <div className="color-card">
            <div className="color-swatch red" aria-label="Red swatch"></div>
            <p className="body-2 color-name">Red</p>
            <p className="body-3 color-hex">#EB5164</p>
          </div>
        </article>
      </section>

      <section className="type-section" aria-labelledby="shadcn-test-section">
        <h2 id="shadcn-test-section" className="section-title body-2">
          shadcn/ui Test
        </h2>
        <article className="flex flex-wrap items-center gap-3">
          <Button>Default</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="outline">Outline</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
        </article>
      </section>

      <section className="type-section" aria-labelledby="headline-section">
        <h2 id="headline-section" className="section-title body-2">
          Headline
        </h2>
        <article className="type-sample">
          <p className="headline-1">Headline 1</p>
          <p className="headline-2">Headline 2</p>
          <p className="headline-3">Headline 3</p>
          <p className="headline-4">Headline 4</p>
        </article>
      </section>

      <section className="type-section" aria-labelledby="body-section">
        <h2 id="body-section" className="section-title body-2">
          Body
        </h2>
        <article className="type-sample">
          <p className="body-1">Body 1</p>
          <p className="body-2">Body 2</p>
          <p className="body-3">Body 3</p>
        </article>
      </section>
    </main>
  )
}

export default App
