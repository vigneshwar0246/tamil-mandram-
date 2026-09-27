import ScrollVideo from "./components/ScrollVideo";

export default function Home() {
  return (
    <main className="site-shell">
      <ScrollVideo />

      <section id="main-site" className="website-arrival">
        <nav className="website-nav" aria-label="Main navigation">
          <a className="website-nav__brand" href="#main-site">
            TAMIL MANDRAM
          </a>
          <div className="website-nav__links">
            <a href="#heritage">Heritage</a>
            <a href="#mandram">Mandram</a>
          </div>
        </nav>

        <div className="website-arrival__content">
          <p className="website-kicker">WELCOME TO</p>
          <h1>Tamil Mandram</h1>
          <p className="website-arrival__lede">
            A living space for the stories, arts, and spirit of Tamil heritage.
          </p>
          <p className="website-arrival__tamil" lang="ta">
            தமிழின் உயிரும் பண்பாடும்
          </p>
        </div>

        <p className="website-arrival__scroll-note">EXPLORE THE ARCHIVE ↓</p>
      </section>

      <section id="heritage" className="site-content-section">
        <div>
          <p className="website-kicker">THE LIVING ARCHIVE</p>
          <h2>Tamil Heritage</h2>
        </div>
        <p className="site-content-section__copy">
          From language and literature to ritual, music, and craft, Tamil culture
          carries a continuous conversation between memory and the present.
        </p>
      </section>

      <section id="mandram" className="site-content-section site-content-section--dark">
        <div>
          <p className="website-kicker">A PLACE TO GATHER</p>
          <h2>Mandram</h2>
        </div>
        <p className="site-content-section__copy">
          Discover, reflect, and return. The cinematic journey has ended; the
          living website is now yours to explore at your own pace.
        </p>
      </section>
    </main>
  );
}
