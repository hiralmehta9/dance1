"use client";

import type { ApiKey, ApiKeyFormData } from "../types";

type ApiKeyModalProps = {
  formData: ApiKeyFormData;
  setFormData: React.Dispatch<React.SetStateAction<ApiKeyFormData>>;
  editingKey: ApiKey | null;
  newKeyValue: string | null;
  copyFeedback: string | null;
  isSubmitting: boolean;
  onClose: () => void;
  onCreate: () => void;
  onUpdate: () => void;
  onCopy: (text: string, feedbackId?: string) => void;
};

export default function ApiKeyModal({
  formData,
  setFormData,
  editingKey,
  newKeyValue,
  copyFeedback,
  isSubmitting,
  onClose,
  onCreate,
  onUpdate,
  onCopy,
}: ApiKeyModalProps) {
  if (newKeyValue) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">API key created</h2>
            <div className="rounded-lg border border-zinc-200 bg-zinc-50 p-4 dark:border-zinc-700 dark:bg-zinc-800">
              <p className="mb-2 text-sm text-zinc-600 dark:text-zinc-400">
                Your API key (copy it now, you won&apos;t see it again):
              </p>
              <code className="block break-all rounded bg-white p-2 font-mono text-sm dark:bg-zinc-900">
                {newKeyValue}
              </code>
              <button
                onClick={() => onCopy(newKeyValue, "new")}
                className="mt-2 inline-flex items-center gap-2 rounded-lg border border-zinc-300 bg-white px-3 py-1.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
              >
                {copyFeedback === "new" ? (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to clipboard
                  </>
                )}
              </button>
            </div>
            <button
              onClick={onClose}
              className="w-full rounded-lg border border-zinc-300 bg-white py-2 font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
            >
              Done
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (editingKey) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
        <div className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onUpdate();
            }}
            className="space-y-5"
          >
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Edit API Key</h2>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Key Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
                placeholder="Key Name"
                className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">Key Type</label>
              <div className="flex gap-3">
                {(["dev", "prod"] as const).map((t) => (
                  <label
                    key={t}
                    className={`flex flex-1 cursor-pointer flex-col gap-1 rounded-lg border-2 p-4 transition-colors ${
                      formData.type === t
                        ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30"
                        : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                    }`}
                  >
                    <div className="flex items-center gap-2">
                      <input
                        type="radio"
                        name="typeEdit"
                        value={t}
                        checked={formData.type === t}
                        onChange={() => setFormData((f) => ({ ...f, type: t }))}
                        className="sr-only"
                      />
                      <span className="font-medium capitalize">{t === "dev" ? "Development" : "Production"}</span>
                    </div>
                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                      {t === "dev" ? "Rate limited to 100 requests/minute" : "Rate limited to 1,000 requests/minute"}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="limitUsageEdit"
                  checked={formData.limitMonthlyUsage}
                  onChange={(e) => setFormData((f) => ({ ...f, limitMonthlyUsage: e.target.checked }))}
                  className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
                />
                <label htmlFor="limitUsageEdit" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                  Limit monthly usage*
                </label>
              </div>
              <input
                type="number"
                min={1}
                value={formData.monthlyLimit}
                onChange={(e) => setFormData((f) => ({ ...f, monthlyLimit: parseInt(e.target.value, 10) || 1000 }))}
                disabled={!formData.limitMonthlyUsage}
                className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-2.5 disabled:bg-zinc-100 disabled:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:disabled:bg-zinc-800/50 dark:disabled:text-zinc-500"
              />
            </div>
            <div className="flex gap-3 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 rounded-lg border border-zinc-300 py-2 font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="flex-1 rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
              >
                {isSubmitting ? "Saving..." : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-lg rounded-xl border border-zinc-200 bg-white p-6 shadow-xl dark:border-zinc-800 dark:bg-zinc-900">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            onCreate();
          }}
          className="space-y-5"
        >
          <div>
            <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">Create a new API key</h2>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Enter a name and limit for the new API key.
            </p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Key Name — A unique name to identify this key
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData((f) => ({ ...f, name: e.target.value }))}
              placeholder="Key Name"
              className="w-full rounded-lg border border-zinc-300 px-4 py-2.5 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-zinc-600 dark:bg-zinc-800 dark:text-zinc-100"
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium text-zinc-700 dark:text-zinc-300">
              Key Type — Choose the environment for this key
            </label>
            <div className="flex gap-3">
              {(["dev", "prod"] as const).map((t) => (
                <label
                  key={t}
                  className={`flex flex-1 cursor-pointer flex-col gap-1 rounded-lg border-2 p-4 transition-colors ${
                    formData.type === t
                      ? "border-blue-500 bg-blue-50 dark:border-blue-500 dark:bg-blue-950/30"
                      : "border-zinc-200 hover:border-zinc-300 dark:border-zinc-700 dark:hover:border-zinc-600"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="type"
                      value={t}
                      checked={formData.type === t}
                      onChange={() => setFormData((f) => ({ ...f, type: t }))}
                      className="sr-only"
                    />
                    {t === "dev" ? (
                      <span className="rounded bg-zinc-100 px-1.5 font-mono text-sm dark:bg-zinc-700">&lt; &gt;</span>
                    ) : (
                      <svg className="h-5 w-5 text-zinc-600 dark:text-zinc-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                      </svg>
                    )}
                    <span className="font-medium capitalize">{t === "dev" ? "Development" : "Production"}</span>
                  </div>
                  <span className="text-xs text-zinc-500 dark:text-zinc-400">
                    {t === "dev" ? "Rate limited to 100 requests/minute" : "Rate limited to 1,000 requests/minute"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                id="limitUsage"
                checked={formData.limitMonthlyUsage}
                onChange={(e) => setFormData((f) => ({ ...f, limitMonthlyUsage: e.target.checked }))}
                className="h-4 w-4 rounded border-zinc-300 text-blue-600 focus:ring-blue-500"
              />
              <label htmlFor="limitUsage" className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                Limit monthly usage*
              </label>
            </div>
            <input
              type="number"
              min={1}
              value={formData.monthlyLimit}
              onChange={(e) => setFormData((f) => ({ ...f, monthlyLimit: parseInt(e.target.value, 10) || 1000 }))}
              disabled={!formData.limitMonthlyUsage}
              className="mt-2 w-full rounded-lg border border-zinc-300 px-4 py-2.5 disabled:bg-zinc-100 disabled:text-zinc-400 dark:border-zinc-600 dark:bg-zinc-800 dark:disabled:bg-zinc-800/50 dark:disabled:text-zinc-500"
            />
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-400">
              * If the combined usage of all your keys exceeds your account&apos;s allocated usage limit (plan, add-ons, and any pay-as-you-go limit), all requests will be rejected.
            </p>
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-zinc-300 py-2 font-medium text-zinc-700 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-zinc-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 disabled:opacity-50"
            >
              {isSubmitting ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
