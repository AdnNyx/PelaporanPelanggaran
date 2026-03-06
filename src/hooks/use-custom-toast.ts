import { useToast } from "@/hooks/use-toast";

export function useCustomToast() {
  const { toast } = useToast();

  const toastSuccess = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 5000,
      className:
        "bg-emerald-50 dark:bg-emerald-950 border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-400 font-medium shadow-lg shadow-emerald-500/10",
    });
  };

  const toastError = (title: string, description?: string) => {
    toast({
      title,
      description,
      variant: "destructive",
      duration: 5000,
      className:
        "bg-rose-50 dark:bg-rose-950 border-rose-200 dark:border-rose-800 text-rose-800 dark:text-rose-400 font-medium shadow-lg shadow-rose-500/10",
    });
  };

  const toastInfo = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 5000,
      className:
        "bg-indigo-50 dark:bg-indigo-950 border-indigo-200 dark:border-indigo-800 text-indigo-800 dark:text-indigo-400 font-medium shadow-lg shadow-indigo-500/10",
    });
  };

  const toastWarning = (title: string, description?: string) => {
    toast({
      title,
      description,
      duration: 5000,
      className:
        "bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-400 font-medium shadow-lg shadow-amber-500/10",
    });
  };

  return { toastSuccess, toastError, toastInfo, toastWarning };
}
