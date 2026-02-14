export type ApiKey = {
  id: string;
  name: string;
  key: string;
  type: "dev" | "prod";
  usage: number;
  monthlyLimit?: number;
  description: string;
  createdAt: string;
};

export type ApiKeyFormData = {
  name: string;
  description: string;
  type: "dev" | "prod";
  limitMonthlyUsage: boolean;
  monthlyLimit: number;
};

export const DEFAULT_FORM_DATA: ApiKeyFormData = {
  name: "",
  description: "",
  type: "dev",
  limitMonthlyUsage: false,
  monthlyLimit: 1000,
};
