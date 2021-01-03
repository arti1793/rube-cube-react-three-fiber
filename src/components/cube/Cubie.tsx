import * as React from "react";
import { useHover } from "../../hooks/useHover";
import { ICubiePart } from "./CubeTypes";
export interface ICubie {
  cubiePartList: ICubiePart[];
}
export const Cubie: React.FC<ICubie> = ({ cubiePartList }) => {
  const [hovered, bindHover] = useHover();
  return (
    <>
      {cubiePartList.map(({ type, material, geometry, rotation }) => (
        <mesh
          {...bindHover}
          onClick={(ev) => {
            ev.stopPropagation();
            console.log({ type, material, geometry, rotation });
          }}
          castShadow
          receiveShadow
          material={material}
          geometry={geometry}
          rotation={rotation}
          scale={hovered ? [105, 105, 105] : [100, 100, 100]}
        />
      ))}
    </>
  );
};
