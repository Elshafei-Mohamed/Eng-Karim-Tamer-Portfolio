
import { flagships } from "@/data/registry";

export const siteFacts = {
  engineersTrained: "100+",
  trainingRounds: 5,
  hoursPerRound: "90+",
  mvpDeliveryDays: flagships.some((p) => p.slug === "mothooq") ? 14 : 0,
} as const;

export const shippedSystemsCount = flagships.length;
