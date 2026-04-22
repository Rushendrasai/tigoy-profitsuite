import type { ProductProfile } from "../types/calculator";

const PROFILES_KEY = "tigoy_profiles";
const DEFAULTS_KEY = "tigoy_defaults";

export function saveProfiles(profiles: ProductProfile[]): void {
  try {
    localStorage.setItem(PROFILES_KEY, JSON.stringify(profiles));
  } catch {
    // Silently fail if storage is unavailable
  }
}

export function loadProfiles(): ProductProfile[] {
  try {
    const raw = localStorage.getItem(PROFILES_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as ProductProfile[];
  } catch {
    return [];
  }
}

export function saveDefaults(taxPercent: number, currency: string): void {
  try {
    localStorage.setItem(
      DEFAULTS_KEY,
      JSON.stringify({ taxPercent, currency }),
    );
  } catch {
    // Silently fail
  }
}

export function loadDefaults(): { taxPercent: number; currency: string } {
  try {
    const raw = localStorage.getItem(DEFAULTS_KEY);
    if (!raw) return { taxPercent: 0, currency: "USD" };
    return JSON.parse(raw) as { taxPercent: number; currency: string };
  } catch {
    return { taxPercent: 0, currency: "USD" };
  }
}
