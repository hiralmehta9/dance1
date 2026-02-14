"use client";

import type { ApiKey } from "../types";
import { maskKey } from "../utils";

function IconButton({
  onClick,
  title,
  icon,
  active,
}: {
  onClick: () => void;
  title: string;
  icon: React.ReactNode;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      className={`rounded p-2 text-zinc-400 transition-colors hover:bg-zinc-100 hover:text-zinc-600 dark:text-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-300 ${active ? "text-blue-600 dark:text-blue-400" : ""}`}
    >
      {icon}
    </button>
  );
}

type ApiKeysTableProps = {
  apiKeys: ApiKey[];
  isLoading: boolean;
  visibleKeys: Set<string>;
  copyFeedback: string | null;
  onCreateClick: () => void;
  onEditClick: (key: ApiKey) => void;
  onDeleteClick: (id: string) => void;
  onToggleVisibility: (id: string) => void;
  onCopy: (text: string) => void;
};

export default function ApiKeysTable({
  apiKeys,
  isLoading,
  visibleKeys,
  copyFeedback,
  onCreateClick,
  onEditClick,
  onDeleteClick,
  onToggleVisibility,
  onCopy,
}: ApiKeysTableProps) {
  return (
    <div className="rounded-xl border border-zinc-200 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="border-b border-zinc-200 px-6 py-5 dark:border-zinc-800">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">API Keys</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              The key is used to authenticate your requests to the Research API. To learn more, see the documentation page.
            </p>
          </div>
          <button
            onClick={onCreateClick}
            className="shrink-0 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700"
          >
            + Create New Key
          </button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-zinc-300 border-t-blue-600 dark:border-zinc-600 dark:border-t-blue-400" />
          <p className="text-zinc-500 dark:text-zinc-400">Loading API keys...</p>
        </div>
      ) : apiKeys.length === 0 ? (
        <div className="flex flex-col items-center justify-center gap-4 py-16">
          <div className="rounded-full bg-zinc-100 p-4 dark:bg-zinc-800">
            <svg className="h-8 w-8 text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <p className="text-zinc-500 dark:text-zinc-400">No API keys yet</p>
          <button
            onClick={onCreateClick}
            className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
          >
            + Create New Key
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-200 dark:border-zinc-800">
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Name</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Usage</th>
                <th className="px-6 py-4 text-left text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Key</th>
                <th className="px-6 py-4 text-right text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Options</th>
              </tr>
            </thead>
            <tbody>
              {apiKeys.map((apiKey) => (
                <tr key={apiKey.id} className="border-b border-zinc-100 transition-colors hover:bg-zinc-50 dark:border-zinc-800 dark:hover:bg-zinc-800/50">
                  <td className="px-6 py-4 font-medium text-zinc-900 dark:text-zinc-100">{apiKey.name}</td>
                  <td className="px-6 py-4 text-sm text-zinc-600 dark:text-zinc-400">{apiKey.usage}</td>
                  <td className="px-6 py-4">
                    <code className="font-mono text-sm text-zinc-700 dark:text-zinc-300">
                      {visibleKeys.has(apiKey.id) ? apiKey.key : maskKey(apiKey.key)}
                    </code>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-1">
                      <IconButton
                        onClick={() => onToggleVisibility(apiKey.id)}
                        title={visibleKeys.has(apiKey.id) ? "Hide key" : "Show key"}
                        icon={
                          visibleKeys.has(apiKey.id) ? (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                            </svg>
                          ) : (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                          )
                        }
                        active={visibleKeys.has(apiKey.id)}
                      />
                      <IconButton
                        onClick={() => onCopy(apiKey.key)}
                        title={copyFeedback === apiKey.id ? "Copied!" : "Copy"}
                        icon={
                          copyFeedback === apiKey.id ? (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                            </svg>
                          ) : (
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                          )
                        }
                        active={copyFeedback === apiKey.id}
                      />
                      <IconButton
                        onClick={() => onEditClick(apiKey)}
                        title="Edit"
                        icon={
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828L18.172 5.172z" />
                          </svg>
                        }
                      />
                      <IconButton
                        onClick={() => onDeleteClick(apiKey.id)}
                        title="Delete"
                        icon={
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        }
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
