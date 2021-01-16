import * as React from "react";
import { applyProps, useFrame } from "react-three-fiber";
import { ReactEventHandlers } from "react-use-gesture/dist/types";
import { Group, Vector3Tuple } from "three";
import { useStore } from "../../store/store";
import { ICubiePart, ILabelPart } from "./CubeTypes";

export interface ICubie {
  cubieId: string;
  bindEvents: ReactEventHandlers;
  // ref: (ref: React.MutableRefObject<Group>) => void;
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
export const Cubie = React.forwardRef<React.MutableRefObject<Group>, ICubie>(
  ({ bindEvents, cubieId }, ref) => {
    const config = useStore((state) => state.config[cubieId]);
    const { labelList, cube } = useStore((state) => state.config[cubieId]);

    return (
      <group
        ref={ref}
        position={config.position.toArray().map((v) => v * 200) as Vector3Tuple}
        // scale={[1, 1, 1]}
        // rotation={hotParams.rotation}
        attach={"group"}
        userData={cube.userData}
        {...bindEvents}
      >
        {/* Static rotation of imported mesh to match global axes */}
        <group
          position={
            config.position.toArray().map((v) => -v * cubieSize) as [
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
  }
);
