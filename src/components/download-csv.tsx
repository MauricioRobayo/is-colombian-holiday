import { ReactNode, useMemo } from "react";
import { twMerge } from "tailwind-merge";

interface DownloadCsvProps {
  data: string[][];
  className?: string;
  children: ReactNode;
}
export function DownloadCsv({
  data,
  children,
  className = "",
}: DownloadCsvProps) {
  const encodedUri = useMemo(() => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += data.map((row) => row.join(",")).join("\n");
    return encodeURI(csvContent);
  }, [data]);
  return (
    <a
      href={encodedUri}
      className={twMerge("flex items-center gap-1 text-blue-600", className)}
    >
      {children}
    </a>
  );
}
