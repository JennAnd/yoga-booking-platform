/**
 * Home page for the Yoga Booking Platform.
 * Highlights the studio, featured classes, and core calls to action.
 */

import Button from "../components/ui/Button";
import ClassCard from "../components/classes/ClassCard";
import { classes } from "../data/classes";

function Home() {
  const featuredClasses = classes.filter((yogaClass) => yogaClass.isFeatured);

  return (
    <section className="home-page">
      <div className="home-hero">
        <div className="home-hero__content">
          <p className="home-hero__eyebrow">Still Studio</p>

          <h1 className="home-hero__title">
            Find your next class and book your spot.
          </h1>
          <p className="home-hero__description">
            Discover heated and non-heated yoga, breathwork, and restorative
            classes in one calm and thoughtfully designed booking experience.
          </p>

          <div className="home-hero__actions">
            <Button variant="primary">Explore classes</Button>
            <Button variant="ghost">View schedule</Button>
          </div>
        </div>

        <div className="home-hero__media" aria-hidden="true">
          <div className="home-hero__image-placeholder">
            <span>Hero image placeholder</span>
          </div>
        </div>
      </div>

      <div className="home-intro">
        <p className="home-intro__text">
          A modern studio experience with clear class information, calm design,
          and a simple way to browse, book, and manage your sessions.
        </p>
      </div>

      <div className="home-featured">
        <div className="home-featured__header">
          <h2>Featured classes</h2>
          <p>Browse some of the most popular classes at Still Studio.</p>
        </div>

        <ul className="class-card-list">
          {featuredClasses.map((yogaClass) => (
            <li key={yogaClass.id}>
              <ClassCard yogaClass={yogaClass} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Home;
