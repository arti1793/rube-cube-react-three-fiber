import * as React from "react";
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
  return cubieConfig.cube.pseudoPosition
    .toArray()
    .map((XorYorZ, index) =>
      config.filter(
        ({ cube }) => cube.pseudoPosition.toArray()[index] === XorYorZ
      )
    ) as [ICubieConfig[], ICubieConfig[], ICubieConfig[]];
};
export const CubeRotator: React.FC<ICubeRotator> = ({ config }) => {
  const [configState, setState] = React.useState(config);

  //   React.useEffect(() => {
  //     console.log(configState, setState);
  //   }, []);

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
    const selectedFaceByX = availablefaces[0];

    console.log(
      configState.filter((cubieConfig) => selectedFaceByX.includes(cubieConfig))
    );
    setState(
      configState.map((cubieConfig) =>
        selectedFaceByX.includes(cubieConfig)
          ? {
              ...cubieConfig,
              rotation: [
                cubieConfig.rotation[0] + 0.1,
                cubieConfig.rotation[1],
                cubieConfig.rotation[2],
              ],
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
