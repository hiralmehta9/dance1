"use client";

type ErrorBannerProps = {
  message: string;
  onDismiss: () => void;
};

export default function ErrorBanner({ message, onDismiss }: ErrorBannerProps) {
  return (
    <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-800 dark:bg-red-950/30 dark:text-red-400">
      {message}
      <button onClick={onDismiss} className="ml-2 font-medium underline">
        Dismiss
      </button>
    </div>
  );
}
