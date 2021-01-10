import * as React from "react";
import { useIsHotkeyPressed } from "react-hotkeys-hook";
import { useStore } from "../../store/store";
import { Cubie } from "./Cubie";

interface ICubeRotator {}

export const CubeRotator: React.FC<ICubeRotator> = () => {
  const config = useStore((state) => state.config);
  const rotate = useStore((state) => state.rotateByCubie);

  const isPressed = useIsHotkeyPressed();
  const handleClick = (ev: any) => {
    ev.stopPropagation();

    console.log(ev.eventObject.position);

    isPressed("space") && console.log("rotating");
    isPressed("space") &&
      rotate(ev.eventObject.userData.id, 0, true, Math.PI / 2);
  };
  return (
    <>
      {Object.values(config).map((cubieConfig, i) => (
        <Cubie
          key={i}
          cubieId={cubieConfig.cube.userData.id}
          bindEvents={{
            onClick: handleClick,
          }}
        />
      ))}
    </>
  );
};
