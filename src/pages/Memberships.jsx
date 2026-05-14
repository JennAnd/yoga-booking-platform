/**
 * Memberships page.
 * Displays pricing plans and allows the user to choose a membership.
 */

import { memberships } from "../data/memberships";
import useAuth from "../hooks/useAuth";
import useToast from "../hooks/useToast";
import { useState } from "react";

function Memberships() {
  const { user, chooseMembership } = useAuth();
  const { showToast } = useToast();
  const [selectedMembership, setSelectedMembership] = useState(null);

  const handleChooseMembership = (membership) => {
    setSelectedMembership(membership);
  };

  const handleBuyMembership = () => {
    if (!selectedMembership) {
      return;
    }

    try {
      chooseMembership(selectedMembership);
      showToast(
        `${selectedMembership.name} has been added to your account.`,
        "success",
      );
      setSelectedMembership(null);
    } catch (error) {
      showToast(error.message, "error");
    }
  };

  return (
    <section className="memberships-page">
      <div className="memberships-page__hero">
        <p className="memberships-page__eyebrow">Memberships</p>

        <h1 className="memberships-page__title">Choose your practice plan</h1>

        <p className="memberships-page__description">
          Flexible options for occasional visits or unlimited weekly practice.
        </p>
      </div>

      <div className="memberships-grid">
        {memberships.map((membership) => (
          <article
            key={membership.id}
            className={`membership-card ${
              membership.isRecommended ? "membership-card--recommended" : ""
            }`}
          >
            {membership.isRecommended ? (
              <p className="membership-card__badge">Most popular</p>
            ) : null}

            <h2>{membership.name}</h2>

            <p className="membership-card__price">
              {membership.price} {membership.currency}
            </p>

            <p className="membership-card__description">
              {membership.description}
            </p>

            {membership.type === "credits" ? (
              <p>{membership.credits} class credits included</p>
            ) : (
              <p>Unlimited bookings</p>
            )}

            <button
              type="button"
              className="ui-button ui-button--primary"
              onClick={() => handleChooseMembership(membership)}
              disabled={!user}
            >
              Choose plan
            </button>
          </article>
        ))}
      </div>
      {selectedMembership ? (
        <div className="membership-confirmation">
          <div className="membership-confirmation__card">
            <h2>Confirm membership</h2>

            <p>
              You are about to buy <strong>{selectedMembership.name}</strong>{" "}
              for{" "}
              <strong>
                {selectedMembership.price} {selectedMembership.currency}
              </strong>
              .
            </p>

            <div className="membership-confirmation__actions">
              <button
                type="button"
                className="ui-button ui-button--primary"
                onClick={handleBuyMembership}
              >
                Buy plan
              </button>

              <button
                type="button"
                className="ui-button ui-button--ghost"
                onClick={() => setSelectedMembership(null)}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default Memberships;
