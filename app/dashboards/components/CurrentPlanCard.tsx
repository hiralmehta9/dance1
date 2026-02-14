"use client";

type CurrentPlanCardProps = {
  totalUsage: number;
  apiLimit: number;
};

export default function CurrentPlanCard({ totalUsage, apiLimit }: CurrentPlanCardProps) {
  const usagePercent = Math.min((totalUsage / apiLimit) * 100, 100);

  return (
    <div className="mb-8 flex overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-orange-500 p-6 shadow-lg">
      <div className="flex-1">
        <p className="text-xs font-semibold uppercase tracking-wider text-white/90">Current Plan</p>
        <h3 className="mt-1 text-2xl font-bold text-white">Researcher</h3>
        <div className="mt-4">
          <p className="mb-2 text-sm font-medium text-white/90">API Limit</p>
          <div className="h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-orange-400 transition-all duration-500"
              style={{ width: `${usagePercent}%` }}
            />
          </div>
          <p className="mt-2 text-sm text-white/90">
            {totalUsage.toLocaleString()} / {apiLimit.toLocaleString()} Requests
          </p>
        </div>
      </div>
      <button className="self-start rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/20">
        Manage Plan
      </button>
    </div>
  );
}
