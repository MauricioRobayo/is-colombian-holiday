import { useEffect, useState } from "react";

export function useHasClipboard() {
  const [hasClipboard, setHasClipboard] = useState(false);
  useEffect(() => {
    if ("clipboard" in window.navigator) {
      setHasClipboard(true);
    }
  }, []);
  return hasClipboard;
}
