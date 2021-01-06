import * as React from "react";
import { Vector3 } from "three";
import { findCubieBy } from "./CubeHelpers";
import { ICubieConfig, TConfig } from "./CubeTypes";
import { Cubie } from "./Cubie";

interface ICubeRotator {
  config: TConfig;
}

const selectFacesFor = (
  cubieConfig: ICubieConfig,
  config: TConfig
): [ICubieConfig[], ICubieConfig[], ICubieConfig[]] => {
  return cubieConfig.position
    .toArray()
    .map((XorYorZ, index) =>
      config.filter(({ position }) => position.toArray()[index] === XorYorZ)
    ) as [ICubieConfig[], ICubieConfig[], ICubieConfig[]];
};

const rotate = (
  cubie: ICubieConfig,
  config: TConfig,
  axis: "x" | "y" | "z",
  direction: "+" | "-"
): TConfig => {
  const availablefaces = selectFacesFor(cubie, config);
  const [selectedFaceByX, selectedFaceByY, selectedFaceByZ] = availablefaces;
  const faceByAxisMap = {
    x: selectedFaceByX,
    y: selectedFaceByY,
    z: selectedFaceByZ,
  };
  const pivotByAxis = {
    x: new Vector3(1, 0, 0),
    y: new Vector3(0, 1, 0),
    z: new Vector3(0, 0, 1),
  };

  const rotateCubie = ({
    rotation,
    position,
    ...rest
  }: ICubieConfig): ICubieConfig => {
    const newRotation = rotation
      .clone()
      [`set${axis.toUpperCase()}` as "setX" | "setY" | "setZ"](
        rotation[axis] + Math.PI / 8
      );
    console.log(rotation, newRotation);
    return {
      ...rest,
      rotation: newRotation,
      position: position
        .applyAxisAngle(pivotByAxis[axis], rotation[axis] + Math.PI / 8)
        .round(),
    };
  };

  return config.map((cubieConfig) =>
    faceByAxisMap[axis].includes(cubieConfig)
      ? rotateCubie(cubieConfig)
      : cubieConfig
  );
};
export const CubeRotator: React.FC<ICubeRotator> = ({ config }) => {
  const [configState, setState] = React.useState(config);

  const handleClick = (ev: any) => {
    ev.stopPropagation();
    const finded = findCubieBy(ev.eventObject.userData.id, configState);
    if (!finded) return;
    console.log({
      ev,
    });

    setState(rotate(finded, configState, "x", "+"));
  };
  return (
    <>
      {configState.map((cubieConfig, i) => (
        <Cubie
          key={i}
          cubieConfig={cubieConfig}
          bindEvents={{
            onClick: handleClick,
          }}
        />
      ))}
    </>
  );
};
