import type { Job } from "@/types";

/**
 * Operation log — ordered by operational maturity (most responsible first).
 * Dates and figures come from the verified resume record.
 */
export const jobs: readonly Job[] = [
  {
    position: "Flutter Instructor",
    organization: "NTI · Creativa Mansoura",
    period: "Oct 2025 - Present",
    kind: "INSTRUCTOR",
    summary:
      "Hired back by the institute that trained me to run its hands-on Flutter program.",
    facts: [
      { label: "TRAINEES", value: "100+" },
      { label: "ROUNDS", value: "5" },
      { label: "HOURS / ROUND", value: "90+" },
    ],
    points: [
      "Deliver intensive, project-based Flutter training covering Cubit, REST API integration, and MVVM architecture.",
      "Mentor trainees through building real-world applications with clean code practices and scalable structure.",
      "Own the curriculum's practical track: every round ships working apps, not exercises.",
    ],
  },
  {
    position: "Freelance Flutter Developer",
    organization: "Mothooq · Client engagement",
    period: "Mar 2025 · 2 weeks",
    kind: "FREELANCE",
    summary:
      "Delivered a used-car marketplace MVP in fourteen days under a fixed client deadline.",
    points: [
      "Built UI and app logic for the marketplace with BLoC state management and responsive layouts.",
      "Integrated Firebase Authentication with Google and Facebook sign-in against a Realtime Database.",
      "Shipped the MVP inside the two-week window with a planned update phase.",
    ],
  },
  {
    position: "Trainee Flutter Developer",
    organization: "NTI",
    period: "Feb 2025 - Mar 2025",
    kind: "TRAINEE",
    summary:
      "Completed NTI's intensive Flutter track, where the arc on this page starts.",
    points: [
      "Covered Dart fundamentals, REST API integration, and state management.",
      "Built multiple applications during collaborative team sessions.",
    ],
  },
] as const;
