"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "../dashboards/Sidebar";
import DashboardHeader from "../dashboards/components/DashboardHeader";

const API_KEY_STORAGE_KEY = "playground_api_key";

export default function PlaygroundPage() {
  const [apiKey, setApiKey] = useState("");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim()) {
      if (typeof window !== "undefined") {
        sessionStorage.setItem(API_KEY_STORAGE_KEY, apiKey.trim());
      }
      router.push("/protected");
    }
  };

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <Sidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />

      <main className={`flex-1 transition-[padding] duration-300 ease-in-out ${sidebarCollapsed ? "pl-16" : "pl-64"}`}>
        <DashboardHeader />

        <div className="p-8">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            API Playground
          </h2>

          <div className="max-w-xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Submit API Key
            </h3>
            <p className="mb-6 text-sm text-zinc-500 dark:text-zinc-400">
              Enter your API key to access the protected area. Your key will be validated on the next page.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="apiKey" className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  API Key
                </label>
                <input
                  id="apiKey"
                  type="password"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                  placeholder="Enter your API key"
                  className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 font-mono text-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                  required
                />
              </div>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-700"
              >
                Submit & Continue
              </button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
