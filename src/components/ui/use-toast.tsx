import type React from "react";
import { toast as sonnerToast } from "sonner";

export type Toast = Parameters<typeof sonnerToast>[0];
export type ToastOptions = Parameters<typeof sonnerToast>[1];
export type ToastActionElement = React.ReactNode;

export const toast = sonnerToast;
export default sonnerToast;

export function useToast() {
  return {
    toast: sonnerToast,
    dismiss: (toastId?: string | number) => sonnerToast.dismiss(toastId),
  };
}