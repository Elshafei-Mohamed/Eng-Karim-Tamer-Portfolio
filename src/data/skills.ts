import type { SkillGroup } from "@/types";

/** Grouped skill inventory — sourced strictly from the resume skills matrix. */
export const skillGroups: readonly SkillGroup[] = [
  {
    label: "MOBILE",
    items: ["FLUTTER", "DART", "RESPONSIVE UI", "LOCALIZATION"],
  },
  {
    label: "ARCHITECTURE & STATE",
    items: ["BLOC / CUBIT", "MVVM", "CLEAN ARCHITECTURE", "SOLID"],
  },
  {
    label: "BACKEND & DATA",
    items: [
      "REST APIS",
      "FIREBASE AUTH",
      "FIRESTORE",
      "SUPABASE",
      "SQFLITE",
      "HIVE",
      "SHARED PREFERENCES",
      "SQL",
    ],
  },
  {
    label: "PRODUCTION & DELIVERY",
    items: [
      "SENTRY",
      "SHOREBIRD OTA",
      "ONESIGNAL",
      "FASTLANE",
      "PUSH NOTIFICATIONS",
      "GOOGLE MAPS",
      "GIT / GITHUB",
    ],
  },
  {
    label: "FOUNDATIONS",
    items: ["OOP", "DATA STRUCTURES", "CLEAN CODE"],
  },
] as const;

export const teachingTopics: readonly string[] = [
  "FLUTTER",
  "DART",
  "STATE MANAGEMENT",
  "API INTEGRATION",
  "ARCHITECTURE",
  "DEBUGGING",
  "DEPLOYMENT",
] as const;
