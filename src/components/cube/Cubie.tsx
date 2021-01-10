import * as React from "react";
import { applyProps, useFrame } from "react-three-fiber";
import { ReactEventHandlers } from "react-use-gesture/dist/types";
import { useStore } from "../../store/store";
import { ICubiePart, ILabelPart } from "./CubeTypes";

export interface ICubie {
  cubieId: string;
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
export const Cubie: React.FC<ICubie> = ({ bindEvents, cubieId }) => {
  const animatedParams = useStore((state) => state.animatedParams[cubieId]);
  const { labelList, cube } = useStore((state) => state.config[cubieId]);

  return (
    <group
      position={animatedParams.scaledPosition}
      rotation={animatedParams.rotation}
      attach={"group"}
      userData={cube.userData}
      {...bindEvents}
    >
      {/* Static rotation of imported mesh to match global axes */}
      <group
        position={
          animatedParams.initialPosition.map((v) => -v * cubieSize) as [
            number,
            number,
            number
          ]
        }
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
