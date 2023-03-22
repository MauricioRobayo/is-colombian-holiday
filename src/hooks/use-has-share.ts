import { useEffect, useState } from "react";

export function useHasShare() {
  const [hasShare, setHasShare] = useState(false);

  useEffect(() => {
    setHasShare("share" in window.navigator);
  }, []);

  return hasShare;
}
