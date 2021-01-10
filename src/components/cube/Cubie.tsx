import * as React from "react";
import { ReactEventHandlers } from "react-use-gesture/dist/types";
import { Group } from "three";
import { ICubieConfig, ICubiePart, ILabelPart } from "./CubeTypes";
export interface ICubie {
  cubieConfig: ICubieConfig;
  bindEvents: ReactEventHandlers;
}

const cubieSize = 200;

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
  cubieConfig: { cube, labelList, rotation, position },
  bindEvents,
}) => {
  const group = React.useRef<Group>();

  return (
    <group
      ref={group}
      attach={"group"}
      {...bindEvents}
      userData={cube.userData}
      rotation={[rotation.y, rotation.x, rotation.z]}
      position={[
        position.x * cubieSize,
        position.y * cubieSize,
        position.z * cubieSize,
      ]}
    >
      {/* Static rotation of imported mesh to match global axes */}
      <group
        position={[
          -position.x * cubieSize,
          -position.y * cubieSize,
          -position.z * cubieSize,
        ]}
        rotation={[-Math.PI, 0, -Math.PI / 2]}
      >
        <CommonMesh {...cube} />
        {labelList.map((label, i) => (
          <CommonMesh key={i} {...label} />
        ))}
      </group>
    </group>
  );
};
