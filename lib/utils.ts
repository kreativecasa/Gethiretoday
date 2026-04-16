import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  const d = new Date(date);
  if (isNaN(d.getTime())) return date;
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export function generateId(): string {
  return crypto.randomUUID();
}

export function downloadAsPDF(_elementId: string, filename: string): void {
  if (typeof window === 'undefined') return;

  // Set the document title so the saved PDF filename is correct
  const originalTitle = document.title;
  document.title = filename.endsWith('.pdf') ? filename.replace('.pdf', '') : filename;

  window.print();

  // Restore title after print dialog closes
  setTimeout(() => {
    document.title = originalTitle;
  }, 1000);
}

export function truncate(str: string, length: number): string {
  if (str.length <= length) return str;
  return str.slice(0, length).trimEnd() + '…';
}
