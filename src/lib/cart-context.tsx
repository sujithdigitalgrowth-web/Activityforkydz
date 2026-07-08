"use client";

import { useSyncExternalStore } from "react";

const STORAGE_KEY = "afk-cart";
const EMPTY: string[] = [];

function readInitial(): string[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : EMPTY;
  } catch {
    return EMPTY;
  }
}

let slugs: string[] = readInitial();
const listeners = new Set<() => void>();

function emit() {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(slugs));
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return slugs;
}

function getServerSnapshot() {
  return EMPTY;
}

function addItem(slug: string) {
  if (!slugs.includes(slug)) {
    slugs = [...slugs, slug];
    emit();
  }
}

function removeItem(slug: string) {
  if (slugs.includes(slug)) {
    slugs = slugs.filter((s) => s !== slug);
    emit();
  }
}

function clear() {
  slugs = [];
  emit();
}

export function useCart() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  return {
    slugs: snapshot,
    count: snapshot.length,
    isInCart: (slug: string) => snapshot.includes(slug),
    addItem,
    removeItem,
    clear,
  };
}
