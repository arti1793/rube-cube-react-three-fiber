import * as React from "react";
import { ReactEventHandlers } from "react-use-gesture/dist/types";
import { ICubieConfig, ICubiePart, ILabelPart } from "./CubeTypes";
export interface ICubie {
  cubieConfig: ICubieConfig;
  bindEvents: ReactEventHandlers;
}

const CommonMesh: React.FC<ICubiePart | ILabelPart> = ({
  geometry,
  rotation,
  material,
  nodeMeta,
}) => {
  return (
    <mesh
      castShadow
      receiveShadow
      material={material}
      geometry={geometry}
      rotation={rotation}
      scale={[100, 100, 100]}
    />
  );
};
export const Cubie: React.FC<ICubie> = ({
  cubieConfig: { cube, labelList, rotation },
  bindEvents,
}) => {
  return (
    <group
      attach={"group"}
      {...bindEvents}
      userData={cube.userData}
      rotation={[rotation[2], -rotation[0], rotation[1]]}
    >
      <CommonMesh {...cube} />
      {labelList.map((label, i) => (
        <CommonMesh key={i} {...label} />
      ))}
    </group>
  );
};
