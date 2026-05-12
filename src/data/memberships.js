/**
 * Membership and pricing options for Still Studio.
 * Used to display simple fake purchase plans in the app.
 */

export const memberships = [
  {
    id: "drop-in",
    name: "Drop-in",
    price: 220,
    currency: "SEK",
    description: "Book one class at a time without a membership.",
    credits: 1,
    type: "credits",
    isRecommended: false,
  },
  {
    id: "five-class-pass",
    name: "5 Class Pass",
    price: 950,
    currency: "SEK",
    description: "A flexible pass for students who practice once in a while.",
    credits: 5,
    type: "credits",
    isRecommended: false,
  },
  {
    id: "ten-class-pass",
    name: "10 Class Pass",
    price: 1750,
    currency: "SEK",
    description: "Best value for regular practice without a monthly plan.",
    credits: 10,
    type: "credits",
    isRecommended: true,
  },
  {
    id: "unlimited-monthly",
    name: "Unlimited Monthly",
    price: 1290,
    currency: "SEK",
    description: "Unlimited studio classes for 30 days.",
    credits: null,
    type: "unlimited",
    isRecommended: false,
  },
];
