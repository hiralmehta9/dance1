"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { supabase } from "@/lib/supabase";
import type { ApiKey, ApiKeyFormData } from "../types";
import { DEFAULT_FORM_DATA } from "../types";
import { rowToApiKey, generateApiKey } from "../utils";

export function useApiKeys() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingKey, setEditingKey] = useState<ApiKey | null>(null);
  const [formData, setFormData] = useState<ApiKeyFormData>(DEFAULT_FORM_DATA);
  const [newKeyValue, setNewKeyValue] = useState<string | null>(null);

  const [copyFeedback, setCopyFeedback] = useState<string | null>(null);
  const [visibleKeys, setVisibleKeys] = useState<Set<string>>(new Set());

  const [toast, setToast] = useState<{ visible: boolean; message: string; type?: "success" | "danger" }>({
    visible: false,
    message: "",
    type: "success",
  });
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showToast = useCallback((message: string, type: "success" | "danger" = "success") => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast({ visible: true, message, type });
    toastTimeoutRef.current = setTimeout(() => {
      setToast((t) => ({ ...t, visible: false }));
      toastTimeoutRef.current = null;
    }, 2000);
  }, []);

  const fetchApiKeys = useCallback(async () => {
    if (!supabase) {
      setError(
        "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local"
      );
      setIsLoading(false);
      return;
    }
    setIsLoading(true);
    setError(null);
    const { data, error: fetchError } = await supabase
      .from("api_keys")
      .select("*")
      .order("created_at", { ascending: false });
    if (fetchError) {
      setError(fetchError.message);
      setApiKeys([]);
    } else {
      setApiKeys((data ?? []).map(rowToApiKey));
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    fetchApiKeys();
  }, [fetchApiKeys]);

  const openCreateModal = useCallback(() => {
    setEditingKey(null);
    setFormData(DEFAULT_FORM_DATA);
    setNewKeyValue(null);
    setIsModalOpen(true);
  }, []);

  const openEditModal = useCallback((key: ApiKey) => {
    setEditingKey(key);
    setFormData({
      name: key.name,
      description: key.description,
      type: key.type,
      limitMonthlyUsage: key.monthlyLimit != null,
      monthlyLimit: key.monthlyLimit ?? 1000,
    });
    setNewKeyValue(null);
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setEditingKey(null);
    setFormData(DEFAULT_FORM_DATA);
    setNewKeyValue(null);
    setCopyFeedback(null);
  }, []);

  const handleCreate = useCallback(async () => {
    if (!formData.name.trim() || !supabase) return;
    setIsSubmitting(true);
    setError(null);
    const keyValue = generateApiKey(formData.type);
    const { data, error: insertError } = await supabase
      .from("api_keys")
      .insert({
        name: formData.name.trim(),
        key: keyValue,
        type: formData.type,
        usage: 0,
        monthly_limit: formData.limitMonthlyUsage ? formData.monthlyLimit : null,
        description: formData.description.trim() || null,
      })
      .select()
      .single();
    setIsSubmitting(false);
    if (insertError) {
      setError(insertError.message);
      return;
    }
    setApiKeys((prev) => [rowToApiKey(data), ...prev]);
    setNewKeyValue(keyValue);
    showToast("API key created successfully");
  }, [formData, showToast]);

  const handleUpdate = useCallback(async () => {
    if (!editingKey || !formData.name.trim() || !supabase) return;
    setIsSubmitting(true);
    setError(null);
    const { error: updateError } = await supabase
      .from("api_keys")
      .update({
        name: formData.name.trim(),
        description: formData.description.trim() || null,
        type: formData.type,
        monthly_limit: formData.limitMonthlyUsage ? formData.monthlyLimit : null,
      })
      .eq("id", editingKey.id);
    setIsSubmitting(false);
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setApiKeys((prev) =>
      prev.map((k) =>
        k.id === editingKey.id
          ? {
              ...k,
              name: formData.name.trim(),
              description: formData.description.trim(),
              type: formData.type,
              monthlyLimit: formData.limitMonthlyUsage ? formData.monthlyLimit : undefined,
            }
          : k
      )
    );
    closeModal();
    showToast("API key updated successfully");
  }, [editingKey, formData, closeModal, showToast]);

  const handleDelete = useCallback(async (id: string) => {
    if (!confirm("Are you sure you want to delete this API key? This action cannot be undone.")) return;
    if (!supabase) return;
    const { error: deleteError } = await supabase.from("api_keys").delete().eq("id", id);
    if (deleteError) {
      setError(deleteError.message);
      return;
    }
    setApiKeys((prev) => prev.filter((k) => k.id !== id));
    showToast("API key deleted successfully", "danger");
  }, [showToast]);

  const toggleKeyVisibility = useCallback((id: string) => {
    setVisibleKeys((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const copyToClipboard = useCallback(
    async (text: string, feedbackId?: string) => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const textArea = document.createElement("textarea");
          textArea.value = text;
          textArea.style.position = "fixed";
          textArea.style.left = "-9999px";
          textArea.style.top = "-9999px";
          document.body.appendChild(textArea);
          textArea.focus();
          textArea.select();
          document.execCommand("copy");
          document.body.removeChild(textArea);
        }
        setCopyFeedback(feedbackId ?? apiKeys.find((k) => k.key === text)?.id ?? null);
        showToast("API key copied to clipboard");
        setTimeout(() => setCopyFeedback(null), 2000);
      } catch {
        alert("Failed to copy. Please select and copy manually.");
      }
    },
    [apiKeys, showToast]
  );

  return {
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
    fetchApiKeys,
    openCreateModal,
    openEditModal,
    closeModal,
    handleCreate,
    handleUpdate,
    handleDelete,
    toggleKeyVisibility,
    copyToClipboard,
  };
}
