import type { Course } from "@/types";

export const education = {
  degree: "Bachelor of Engineering in Computer Engineering",
  university: "Tanta University",
  location: "Tanta, Egypt",
  period: "09/2020 - 07/2025",
} as const;

/* Grade intentionally omitted until verified from the transcript. */

export const courses: readonly Course[] = [
  {
    title: "Mastering Flutter: Responsive & Adaptive UI Design",
    platform: "Udemy",
    duration: "12/2024 - 01/2025",
  },
  {
    title: "Flutter Advanced Course: BLoC and MVVM Pattern",
    platform: "Udemy",
    duration: "06/2024 - 08/2024",
  },
  {
    title: "Complete Flutter & Dart Development Course",
    platform: "Udemy",
    duration: "01/2024 - 05/2024",
  },
] as const;
