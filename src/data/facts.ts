/**
 * Site-wide verified facts.
 * Single source of truth — components must never hardcode these numbers
 * (Phase 8 §5: one definition, consumed everywhere).
 *
 * Sources:
 * - engineersTrained / trainingRounds / hoursPerRound: NTI instructor record (resume).
 * - mvpDeliveryDays: Mothooq client engagement, March 2025.
 * - shippedSystems: derived from the flagship registry below.
 */
import { flagships } from "@/data/registry";

export const siteFacts = {
  engineersTrained: "100+",
  trainingRounds: 5,
  hoursPerRound: "90+",
  mvpDeliveryDays: flagships.some((p) => p.slug === "mothooq") ? 14 : 0,
} as const;

/** Shipped systems = flagship registry size. Never hardcode this elsewhere. */
export const shippedSystemsCount = flagships.length;
