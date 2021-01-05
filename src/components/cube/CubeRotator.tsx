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
export const CubeRotator: React.FC<ICubeRotator> = ({ config }) => {
  const [configState, setState] = React.useState(config);

  const handleClick = (ev: any) => {
    ev.stopPropagation();
    const finded = findCubieBy(ev.eventObject.userData.id, configState);
    if (!finded) return;
    const availablefaces = selectFacesFor(finded, configState);
    console.log({
      ev,
      one: finded,
      availablefaces,
    });
    const [selectedFaceByX, selectedFaceByY] = availablefaces;

    setState(
      configState.map((cubieConfig) =>
        selectedFaceByY.includes(cubieConfig)
          ? {
              ...cubieConfig,
              rotation: [
                cubieConfig.rotation[0],
                cubieConfig.rotation[1] + Math.PI / 2,
                cubieConfig.rotation[2],
              ],
              position: cubieConfig.position
                .applyAxisAngle(
                  new Vector3(...[0, 1, 0]),
                  cubieConfig.rotation[1] + Math.PI / 2
                )
                .round(),
            }
          : cubieConfig
      )
    );
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
