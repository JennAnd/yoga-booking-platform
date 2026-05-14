/**
 * Classes page.
 * Presents the class types offered at Still Studio.
 */

import classesHeroImage from "../assets/classes-hero.webp";

function Classes() {
  return (
    <section className="classes-page classes-page--info">
      <img
        className="classes-page__hero-image"
        src={classesHeroImage}
        alt="Warm yoga props in a calm studio setting"
      />

      <section className="classes-info" aria-labelledby="classes-types-title">
        <div className="classes-info__header">
          <p className="classes-info__eyebrow">Class types</p>
          <h2 id="classes-types-title">
            Find the rhythm that fits your practice.
          </h2>
        </div>

        <div className="classes-info__grid">
          <article className="classes-info__item">
            <h2>Vinyasa Yoga</h2>
            <p>
              Dynamic heated flow classes with strength, rhythm, and breath-led
              movement.
            </p>
          </article>

          <article className="classes-info__item">
            <h2>Hatha Yoga</h2>
            <p>
              Steady, alignment-focused classes with longer holds and a grounded
              pace.
            </p>
          </article>

          <article className="classes-info__item">
            <h2>Yin Yoga</h2>
            <p>
              Slower sessions designed for release, recovery, and deeper rest.
            </p>
          </article>

          <article className="classes-info__item">
            <h2>Breathwork</h2>
            <p>
              Simple guided practices that support focus, calm, and nervous
              system balance.
            </p>
          </article>

          <article className="classes-info__item">
            <h2>Meditation</h2>
            <p>
              Quiet classes for presence, stillness, and intentional recovery.
            </p>
          </article>

          <article className="classes-info__item">
            <h2>Ashtanga Yoga</h2>
            <p>
              Structured practice with strong sequencing and traditional
              foundations.
            </p>
          </article>
        </div>
      </section>
    </section>
  );
}

export default Classes;
