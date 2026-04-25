/**
 * Mock instructor data for the Yoga Booking Platform.
 * Can later be used for instructor bios, profile sections, and related class details.
 */

import elinImage from "../assets/elin.webp";
import majaImage from "../assets/maja.webp";
import novaImage from "../assets/nova.webp";
import lucaImage from "../assets/luca.webp";
import noahImage from "../assets/noah.webp";
import arvidImage from "../assets/arvid.webp";

export const instructors = [
  {
    id: "elin-sorelli",
    name: "Elin Sorelli",
    specialty: "Hot Vinyasa & Flow",
    bio: "Elin teaches energizing flow classes with a focus on breath, consistency, and accessible progression.",
    image: elinImage,
  },
  {
    id: "luca-virelli",
    name: "Luca Virelli",
    specialty: "Yin Yoga & Recovery",
    bio: "Luca leads slower classes designed to support flexibility, recovery, and a calmer nervous system.",
    image: lucaImage,
  },
  {
    id: "maja-lior",
    name: "Maja Lior",
    specialty: "Hot Hatha & Alignment",
    bio: "Maja teaches structured, alignment-focused classes that help students build strength and steady technique.",
    image: majaImage,
  },
  {
    id: "noah-elden",
    name: "Noah Elden",
    specialty: "Breathwork & Grounding",
    bio: "Noah combines guided breathing and calming movement to create classes that feel centered and restorative.",
    image: noahImage,
  },
  {
    id: "arvid-solberg",
    name: "Arvid Solberg",
    specialty: "Ashtanga & Strength",
    bio: "Arvid leads dynamic practices with clear structure, strong sequencing, and a focus on control and discipline.",
    image: arvidImage,
  },
  {
    id: "nova-ahlgren",
    name: "Nova Ahlgren",
    specialty: "Meditation & Rest",
    bio: "Nova creates quiet, restorative sessions centered on mindfulness, rest, and intentional slowing down.",
    image: novaImage,
  },
];
