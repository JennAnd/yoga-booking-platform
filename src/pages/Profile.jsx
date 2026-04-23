/**
 * Profile page.
 * Displays the authenticated user's membership and account overview.
 */

import useAuth from "../hooks/useAuth";
import { classes } from "../data/classes";
import profileHeroImage from "../assets/profile-hero.webp";

function Profile() {
  const { user } = useAuth();
  const bookedClasses = user.bookings
    .map((classId) =>
      classes.find((currentClass) => currentClass.id === classId),
    )
    .filter(Boolean);

  const waitlistedClasses = user.waitlist
    .map((classId) =>
      classes.find((currentClass) => currentClass.id === classId),
    )
    .filter(Boolean);

  return (
    <section className="profile-page">
      <div className="profile-page__hero">
        <div className="profile-page__hero-content">
          <p className="profile-page__eyebrow">My profile</p>
          <h1 className="profile-page__title">
            Welcome back, {user.firstName}.
          </h1>
          <p className="profile-page__description">
            Manage your membership, review your details, and keep track of your
            activity at Still Studio.
          </p>
        </div>

        <img
          className="profile-page__hero-image"
          src={profileHeroImage}
          alt="Still Studio profile overview"
        />
      </div>

      <div className="profile-page__grid">
        <article className="profile-card">
          <h2>Account details</h2>
          <p>
            <strong>Name:</strong> {user.firstName} {user.lastName}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </article>

        <article className="profile-card">
          <h2>Membership</h2>
          <p>
            <strong>Plan:</strong> {user.membership}
          </p>
          <p>
            Your current membership gives you access to book studio classes.
          </p>
        </article>

        <article className="profile-card">
          <h2>Bookings</h2>
          {bookedClasses.length > 0 ? (
            <div className="profile-class-list">
              {bookedClasses.map((yogaClass) => (
                <div key={yogaClass.id} className="profile-class-item">
                  <h3>{yogaClass.title}</h3>
                  <p>
                    {yogaClass.date} • {yogaClass.time}
                  </p>
                  <p>
                    {yogaClass.instructor} • {yogaClass.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>You have no upcoming bookings yet.</p>
          )}
        </article>

        <article className="profile-card">
          <h2>Waitlist</h2>

          {waitlistedClasses.length > 0 ? (
            <div className="profile-class-list">
              {waitlistedClasses.map((yogaClass) => (
                <div key={yogaClass.id} className="profile-class-item">
                  <h3>{yogaClass.title}</h3>
                  <p>
                    {yogaClass.date} • {yogaClass.time}
                  </p>
                  <p>
                    {yogaClass.instructor} • {yogaClass.location}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p>Your waitlist is empty right now.</p>
          )}
        </article>

        <article className="profile-card">
          <h2>Favorites</h2>
          <p>Your saved classes will appear here later.</p>
        </article>
      </div>
    </section>
  );
}

export default Profile;
