import type { ApiKey } from "./types";

export function rowToApiKey(row: {
  id: string;
  name: string;
  key: string;
  type: string;
  usage: number;
  monthly_limit: number | null;
  description: string | null;
  created_at: string;
}): ApiKey {
  return {
    id: row.id,
    name: row.name,
    key: row.key,
    type: row.type as "dev" | "prod",
    usage: row.usage ?? 0,
    monthlyLimit: row.monthly_limit ?? undefined,
    description: row.description ?? "",
    createdAt: row.created_at,
  };
}

export function generateApiKey(type: "dev" | "prod"): string {
  const prefix = type === "dev" ? "hira-dev-" : "hira-prod-";
  return prefix + Math.random().toString(36).slice(2, 15) + Math.random().toString(36).slice(2, 15);
}

export function maskKey(key: string): string {
  let prefix = key.slice(0, 8);
  if (key.startsWith("hira-dev-")) prefix = "hira-dev-";
  else if (key.startsWith("hira-prod-")) prefix = "hira-prod-";
  const rest = key.slice(prefix.length);
  return prefix + "*".repeat(Math.min(rest.length, 27));
}
