/**
 * Profile page.
 * Displays the authenticated user's membership and account overview.
 */

import useAuth from "../hooks/useAuth";

function Profile() {
  const { user } = useAuth();

  return (
    <section className="profile-page">
      <div className="profile-page__hero">
        <p className="profile-page__eyebrow">My profile</p>
        <h1 className="profile-page__title">Welcome back, {user.firstName}.</h1>
        <p className="profile-page__description">
          Manage your membership, review your details, and keep track of your
          activity at Still Studio.
        </p>
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
          <p>You have no upcoming bookings yet.</p>
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
