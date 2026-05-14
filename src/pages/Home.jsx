/**
 * Home page for the Yoga Booking Platform.
 * Highlights the studio, featured classes, and core calls to action.
 */

import { Link } from "react-router-dom";
import Button from "../components/ui/Button";
import { instructors } from "../data/instructors";
import heroImage from "../assets/hero.webp";
import benefitsImage from "../assets/benefits.webp";

function Home() {
  const featuredInstructors = instructors;

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
            <Link to="/classes">
              <Button variant="primary">Explore classes</Button>
            </Link>

            <Link to="/schedule">
              <Button variant="ghost">View schedule</Button>
            </Link>
          </div>
        </div>

        <div className="home-hero__media">
          <img
            className="home-hero__image"
            src={heroImage}
            alt="Warm yoga studio with mats and bolsters"
          />
        </div>
      </div>

      <div className="home-intro">
        <p className="home-intro__text">
          A modern studio experience with clear class information, calm design,
          and a simple way to browse, book, and manage your sessions.
        </p>
      </div>

      <section className="home-benefits" aria-labelledby="home-benefits-title">
        <div className="home-benefits__top">
          <div className="home-benefits__header">
            <p className="home-benefits__eyebrow">Why Still Studio</p>
            <h2 id="home-benefits-title">
              A calm booking experience from start to finish.
            </h2>
          </div>

          <div className="home-benefits__media">
            <img
              className="home-benefits__image"
              src={benefitsImage}
              alt="Calm wellness studio atmosphere with warm light"
            />
          </div>
        </div>

        <div className="home-benefits__grid">
          <article className="home-benefit-card">
            <h3>Clear class information</h3>
            <p>
              Browse class types, levels, instructors, availability, and pricing
              in one place.
            </p>
          </article>

          <article className="home-benefit-card">
            <h3>Classes for every rhythm</h3>
            <p>
              Explore heated flow, slower recovery sessions, breathwork,
              meditation, and Ashtanga.
            </p>
          </article>

          <article className="home-benefit-card">
            <h3>Simple booking flow</h3>
            <p>
              Find a class quickly, reserve your spot, and manage your sessions
              without friction.
            </p>
          </article>
        </div>
      </section>

      <section
        className="home-instructors"
        aria-labelledby="home-instructors-title"
      >
        <div className="home-instructors__header">
          <p className="home-instructors__eyebrow">Meet the instructors</p>
          <h2 id="home-instructors-title">
            Experienced teachers with different rhythms and strengths.
          </h2>
        </div>

        <div className="home-instructors__grid">
          {featuredInstructors.map((instructor) => (
            <article key={instructor.id} className="home-instructor-card">
              <img
                className="home-instructor-card__image"
                src={instructor.image}
                alt={instructor.name}
              />

              <div className="home-instructor-card__content">
                <h3>{instructor.name}</h3>
                <p className="home-instructor-card__specialty">
                  {instructor.specialty}
                </p>
                <p className="home-instructor-card__bio">{instructor.bio}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
    </section>
  );
}

export default Home;
