/**
 * Classes page.
 * Presents the class types offered at Still Studio.
 */

function Classes() {
  return (
    <section className="classes-page">
      <div className="classes-page__header">
        <h1>Explore our class types.</h1>

        <p>
          From heated flow to slower recovery sessions, Still Studio offers
          practices for different rhythms, energy levels, and experience.
        </p>
      </div>

      <section
        className="home-categories"
        aria-labelledby="classes-types-title"
      >
        <div className="home-categories__header">
          <p className="home-categories__eyebrow">Class types</p>
          <h2 id="classes-types-title">
            Find the rhythm that fits your practice.
          </h2>
        </div>

        <div className="home-categories__grid">
          <article className="home-category-card">
            <h3>Vinyasa Yoga</h3>
            <p>
              Dynamic heated flow classes with strength, rhythm, and breath-led
              movement.
            </p>
          </article>

          <article className="home-category-card">
            <h3>Hatha Yoga</h3>
            <p>
              Steady, alignment-focused classes with longer holds and a grounded
              pace.
            </p>
          </article>

          <article className="home-category-card">
            <h3>Yin Yoga</h3>
            <p>
              Slower sessions designed for release, recovery, and deeper rest.
            </p>
          </article>

          <article className="home-category-card">
            <h3>Breathwork</h3>
            <p>
              Simple guided practices that support focus, calm, and nervous
              system balance.
            </p>
          </article>

          <article className="home-category-card">
            <h3>Meditation</h3>
            <p>
              Quiet classes for presence, stillness, and intentional recovery.
            </p>
          </article>

          <article className="home-category-card">
            <h3>Ashtanga Yoga</h3>
            <p>
              Structured, disciplined practice with strong sequencing and
              traditional foundations.
            </p>
          </article>
        </div>
      </section>
    </section>
  );
}

export default Classes;
