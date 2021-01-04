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
      {cubiePartList.map(({ type, material, geometry, rotation }, i) => (
        <mesh
          key={i}
          {...bindHover}
          onClick={(ev) => {
            if (type === "label") return;
            ev.stopPropagation();
            console.log({
              position: geometry.boundingBox?.max
                ?.toArray()
                .map((num) => Math.round(num))
                .join(" "),
              type,
              material,
              geometry,
              rotation,
            });
          }}
          castShadow
          receiveShadow
          material={material}
          geometry={geometry}
          rotation={rotation}
          scale={hovered ? [101, 101, 101] : [100, 100, 100]}
        />
      ))}
    </>
  );
};
