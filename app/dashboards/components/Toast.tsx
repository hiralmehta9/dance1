"use client";

type ToastProps = {
  visible: boolean;
  message: string;
  type?: "success" | "danger";
};

export default function Toast({ visible, message, type = "success" }: ToastProps) {
  if (!visible) return null;

  return (
    <div
      className={`fixed bottom-8 right-8 z-50 flex items-center gap-2 rounded-lg border px-4 py-3 shadow-lg ${
        type === "danger"
          ? "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50"
          : "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50"
      }`}
      role="status"
      aria-live="polite"
    >
      {type === "danger" ? (
        <svg
          className="h-5 w-5 flex-shrink-0 text-red-600 dark:text-red-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ) : (
        <svg
          className="h-5 w-5 flex-shrink-0 text-emerald-600 dark:text-emerald-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
      <span
        className={`text-sm font-medium ${
          type === "danger" ? "text-red-800 dark:text-red-200" : "text-emerald-800 dark:text-emerald-200"
        }`}
      >
        {message}
      </span>
    </div>
  );
}
