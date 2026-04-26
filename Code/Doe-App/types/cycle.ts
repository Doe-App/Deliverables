export const CYCLE_PHASES = ["period", "follicular", "fertile", "luteal"] as const;
export type CyclePhase = (typeof CYCLE_PHASES)[number];

/**
 * Returns the cycle phase for a given day-of-cycle.
 *
 * TODO(cap2): respect cycleLength once predictions are wired up.
 * Boundaries are pinned to a 28-day cycle (5/13/16) for display parity.
 */
export function phaseForDay(day: number, cycleLength = 28): CyclePhase {
  if (day <= 5) return "period";
  if (day <= 13) return "follicular";
  if (day <= 16) return "fertile";
  return "luteal";
}
