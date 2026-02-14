"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { useApiKeys } from "./hooks/useApiKeys";
import {
  Toast,
  ErrorBanner,
  CurrentPlanCard,
  DashboardHeader,
  ApiKeyModal,
  ApiKeysTable,
} from "./components";

const API_LIMIT = 1000;

export default function DashboardsPage() {
  const {
    apiKeys,
    isLoading,
    isSubmitting,
    error,
    setError,
    isModalOpen,
    editingKey,
    formData,
    setFormData,
    newKeyValue,
    copyFeedback,
    visibleKeys,
    toast,
    openCreateModal,
    openEditModal,
    closeModal,
    handleCreate,
    handleUpdate,
    handleDelete,
    toggleKeyVisibility,
    copyToClipboard,
  } = useApiKeys();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const totalUsage = apiKeys.reduce((sum, k) => sum + k.usage, 0);

  return (
    <div className="flex min-h-screen bg-zinc-100 dark:bg-zinc-950">
      <Sidebar collapsed={sidebarCollapsed} onCollapsedChange={setSidebarCollapsed} />

      <main className={`flex-1 transition-[padding] duration-300 ease-in-out ${sidebarCollapsed ? "pl-16" : "pl-64"}`}>
        <DashboardHeader />

        <div className="p-8">
          <h2 className="mb-6 text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            Overview
          </h2>

          {error && <ErrorBanner message={error} onDismiss={() => setError(null)} />}

          <CurrentPlanCard totalUsage={totalUsage} apiLimit={API_LIMIT} />

          <ApiKeysTable
            apiKeys={apiKeys}
            isLoading={isLoading}
            visibleKeys={visibleKeys}
            copyFeedback={copyFeedback}
            onCreateClick={openCreateModal}
            onEditClick={openEditModal}
            onDeleteClick={handleDelete}
            onToggleVisibility={toggleKeyVisibility}
            onCopy={copyToClipboard}
          />
        </div>
      </main>

      {isModalOpen && (
        <ApiKeyModal
          formData={formData}
          setFormData={setFormData}
          editingKey={editingKey}
          newKeyValue={newKeyValue}
          copyFeedback={copyFeedback}
          isSubmitting={isSubmitting}
          onClose={closeModal}
          onCreate={handleCreate}
          onUpdate={handleUpdate}
          onCopy={copyToClipboard}
        />
      )}

      <Toast visible={toast.visible} message={toast.message} type={toast.type} />
    </div>
  );
}
