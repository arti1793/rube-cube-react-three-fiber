import { useSpring } from "react-spring";
import { useState } from "react";
import { useHotkeys, useIsHotkeyPressed } from "react-hotkeys-hook";
import { useFrame } from "react-three-fiber";
interface ILean {
  leanRight: boolean;
  leanLeft: boolean;
  leanDefault: boolean;
}

const selectTargetRotation = (
  { leanLeft, leanRight, leanDefault }: ILean,
  def: { x: number; y: number; z: number }
) => {
  if (leanLeft) return { x: 0, y: Math.PI / 2, z: -Math.PI / 2 };
  if (leanRight) return { x: Math.PI / 2, y: 0, z: Math.PI / 2 };
  if (leanDefault) return { x: 0, y: 0, z: 0 };
  return def;
};
export const useCubeViewRotation = (
  flags: ILean,
  rotation: { x: number; y: number; z: number } = { x: 0, y: 0, z: 0 }
) => {
  const [currentRotation, setCurrentRotation] = useState(rotation);

  useSpring({
    from: { x: rotation.x, y: rotation.y, z: rotation.z },
    to: selectTargetRotation(flags, currentRotation),
    onFrame: ({ x, y, z }: { x: number; y: number; z: number }) =>
      setCurrentRotation({ x, y, z }),
  });

  return currentRotation;
};

export const useLeanFlags = () => {
  const [flags, setFlags] = useState({
    leanLeft: false,
    leanRight: false,
    leanDefault: false,
  });
  useHotkeys("e", () => {
    setFlags((flags) => ({
      leanRight: !flags.leanRight,
      leanLeft: false,
      leanDefault: flags.leanRight,
    }));
  });
  useHotkeys("q", (ev) => {
    setFlags((flags) => ({
      leanLeft: !flags.leanLeft,
      leanRight: false,
      leanDefault: flags.leanLeft,
    }));
  });

  return flags;
};
