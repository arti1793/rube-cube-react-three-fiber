import * as React from "react";
import { useIsHotkeyPressed } from "react-hotkeys-hook";
import { Euler, Group, Vector3 } from "three";
import { useFacer } from "../../hooks/useFacer";
import { useStore } from "../../store/store";
import { Cubie } from "./Cubie";

interface ICubeRotator {}

const tempGroup = new Group();
const outerGroup = new Group();

((window as unknown) as any).axis = 1;

const rotate = (groups: Group[], axis: number) => {
  groups.forEach((gr) => {
    tempGroup.attach(gr);
  });
  tempGroup.rotateOnAxis(new Vector3().setComponent(axis, 1), Math.PI / 2);

  groups.forEach((gr, i) => {
    outerGroup.attach(gr);
    gr.position.round();
  });

  tempGroup.setRotationFromEuler(new Euler(0, 0, 0));
};

export const CubeRotator: React.FC<ICubeRotator> = () => {
  const config = useStore((state) => state.config);

  const isPressed = useIsHotkeyPressed();
  const tempGroupRef = React.useRef<Group>();
  const outerGroupRef = React.useRef<Group>();
  const [refCarry, setFace] = useFacer(Object.keys(config).length);

  const handleClick = (ev: any) => {
    ev.stopPropagation();

    console.log(ev.eventObject.position);

    const direction = !isPressed("shift");
    isPressed("space") && console.log("rotating");

    const axis = ((window as unknown) as any).axis;

    ev.eventObject.updateMatrixWorld();
    const groups = setFace(ev.eventObject.userData.id, axis);
    console.log({
      groups,
      position: groups.map((g) => g.position.toArray()),
    });

    if (isPressed("space")) {
      rotate(groups, axis);
    }
  };

  return (
    <primitive object={outerGroup} ref={outerGroupRef}>
      <primitive object={tempGroup} ref={tempGroupRef} />
      {Object.values(config).map((cubieConfig, i) => (
        <Cubie
          key={i}
          ref={refCarry(cubieConfig.cube.userData.id) as any}
          cubieId={cubieConfig.cube.userData.id}
          bindEvents={{
            onClick: handleClick,
          }}
        />
      ))}
    </primitive>
  );
};
