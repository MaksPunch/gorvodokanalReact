import React, { useEffect } from "react";

export const useClickOutside = (
  ref: React.RefObject<HTMLDivElement>,
  setOpen: (open: boolean) => void,
) =>
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClick, true);

    return () => {
      document.removeEventListener("click", handleClick, true);
    };
  }, [ref, setOpen]);
