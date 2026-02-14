"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Sidebar from "../dashboards/Sidebar";
import DashboardHeader from "../dashboards/components/DashboardHeader";
import Toast from "../dashboards/components/Toast";

const API_KEY_STORAGE_KEY = "playground_api_key";

export default function ProtectedPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [toast, setToast] = useState<{ visible: boolean; message: string; type: "success" | "danger" }>({
    visible: false,
    message: "",
    type: "success",
  });
  const [isValidating, setIsValidating] = useState(true);
  const [isValid, setIsValid] = useState<boolean | null>(null);

  useEffect(() => {
    const validateKey = async () => {
      const storedKey = typeof window !== "undefined" ? sessionStorage.getItem(API_KEY_STORAGE_KEY) : null;

      if (!storedKey) {
        setIsValid(false);
        setToast({ visible: true, message: "Your API key is invalid", type: "danger" });
        setIsValidating(false);
        return;
      }

      if (!supabase) {
        setIsValid(false);
        setToast({ visible: true, message: "Your API key is invalid", type: "danger" });
        setIsValidating(false);
        return;
      }

      const { data, error } = await supabase
        .from("api_keys")
        .select("id")
        .eq("key", storedKey)
        .maybeSingle();

      if (error || !data) {
        setIsValid(false);
        setToast({ visible: true, message: "Your API key is invalid", type: "danger" });
      } else {
        setIsValid(true);
        setToast({
          visible: true,
          message: "Success - API key Validated",
          type: "success",
        });
      }

      setIsValidating(false);

      const timeout = setTimeout(() => setToast((t) => ({ ...t, visible: false })), 3000);
      return () => clearTimeout(timeout);
    };

    validateKey();
  }, []);

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <Sidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />

      <main className={`flex-1 transition-[padding] duration-300 ease-in-out ${sidebarCollapsed ? "pl-16" : "pl-64"}`}>
        <DashboardHeader />

        <div className="p-8">
          <div className="max-w-xl rounded-xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
            <h3 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Protected Area
            </h3>
            <p className={`text-sm ${isValid === false ? "font-medium text-red-600 dark:text-red-400" : isValid === true ? "font-medium text-emerald-600 dark:text-emerald-400" : "text-zinc-500 dark:text-zinc-400"}`}>
              {isValidating && "Validating your API key..."}
              {!isValidating && isValid === true && "Success - API key Validated"}
              {!isValidating && isValid === false && "Your API key is invalid"}
            </p>
          </div>
        </div>
      </main>

      <Toast visible={toast.visible} message={toast.message} type={toast.type} />
    </div>
  );
}
