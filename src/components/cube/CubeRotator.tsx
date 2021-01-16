import * as React from "react";
import { Group } from "three";
import { useCubeGestures } from "../../hooks/useCubeGestures";
import { useFacer } from "../../hooks/useFacer";
import { useRotate } from "../../hooks/useRotate";
import { useStore } from "../../store/store";
import { Cubie } from "./Cubie";

interface ICubeRotator {}

const tempGroup = new Group();
const outerGroup = new Group();

((window as unknown) as any).axis = 1;

export const CubeRotator: React.FC<ICubeRotator> = () => {
  const config = useStore((state) => state.config);

  const tempGroupRef = React.useRef<Group>();
  const outerGroupRef = React.useRef<Group>();
  const [refCarry, getFace] = useFacer(Object.keys(config).length);

  const dragHandler = useRotate({ tempGroup, outerGroup, getFace: getFace });
  const bind = useCubeGestures(dragHandler);

  return (
    <primitive object={outerGroup} ref={outerGroupRef}>
      <primitive object={tempGroup} ref={tempGroupRef} />
      {Object.values(config).map((cubieConfig, i) => (
        <Cubie
          key={i}
          ref={refCarry(cubieConfig.cube.userData.id) as any}
          cubieId={cubieConfig.cube.userData.id}
          bindEvents={bind()}
        />
      ))}
    </primitive>
  );
};
