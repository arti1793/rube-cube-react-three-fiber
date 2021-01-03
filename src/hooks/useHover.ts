import { useState, useCallback } from "react";
export function useHover() {
  const [hovered, setHover] = useState(false);
  const hover = useCallback((e) => {
    e.stopPropagation();
    setHover(true);
  }, []);
  const unhover = useCallback((e) => setHover(false), []);
  return [hovered, { onPointerOver: hover, onPointerOut: unhover }];
}
