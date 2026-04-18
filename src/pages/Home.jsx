/**
 * Home page for the Yoga Booking Platform.
 * Highlights featured classes and introduces the studio experience.
 */

import ClassCard from "../components/classes/ClassCard";
import { classes } from "../data/classes";

function Home() {
  const featuredClasses = classes.filter((yogaClass) => yogaClass.isFeatured);

  return (
    <section className="home-page">
      <div className="home-hero">
        <p className="home-hero__eyebrow">Still Studio</p>
        <h1 className="home-hero__title">
          Find your next class and book your spot.
        </h1>
        <p className="home-hero__description">
          Explore heated and non-heated yoga classes, discover experienced
          instructors, and manage your bookings in one calm and simple place.
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
