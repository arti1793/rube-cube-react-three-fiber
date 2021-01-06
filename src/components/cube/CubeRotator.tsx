import * as React from "react";
import { useIsHotkeyPressed } from "react-hotkeys-hook";
import { useCubeRotation } from "../../hooks/useCubeRotation";
import { findCubieBy } from "./CubeHelpers";
import { ICubieConfig, TConfig } from "./CubeTypes";
import { Cubie } from "./Cubie";

interface ICubeRotator {
  config: TConfig;
}

const selectFacesFor = (
  cubieConfig: ICubieConfig,
  config: TConfig
): {
  x: ICubieConfig[];
  y: ICubieConfig[];
  z: ICubieConfig[];
  cache: { [key: string]: Set<string> };
} => {
  const findFaceByAxis = (XorYorZ: number, axis: "x" | "y" | "z") =>
    config.filter(({ position }) => position[axis] === XorYorZ);

  const x = findFaceByAxis(cubieConfig.position.x, "x");
  const y = findFaceByAxis(cubieConfig.position.y, "y");
  const z = findFaceByAxis(cubieConfig.position.z, "z");
  return {
    x,
    y,
    z,
    cache: {
      x: new Set(
        x.map(
          ({
            cube: {
              userData: { id },
            },
          }) => id
        )
      ),
      y: new Set(
        y.map(
          ({
            cube: {
              userData: { id },
            },
          }) => id
        )
      ),
      z: new Set(
        z.map(
          ({
            cube: {
              userData: { id },
            },
          }) => id
        )
      ),
    },
  };
};

export const CubeRotator: React.FC<ICubeRotator> = ({ config }) => {
  const [configState, setRotate] = useCubeRotation(config);

  // React.useEffect(() => {
  //   // const a = new Euler(Math.PI / 2, 0, 0, "XYZ");
  //   // const aa = new Euler(0, Math.PI / 2, 0, "XYZ");
  //   const b = new Vector3(1, 1, 1);
  //   // const c = b.applyEuler(a);
  //   // const cc = c.applyEuler(aa);
  //   console.log(
  //     b
  //       .clone()
  //       .applyMatrix4(createRotationalMAtrix("x", Math.PI / 2))
  //       .round(),
  //     b
  //       .applyMatrix4(createRotationalMAtrix("y", Math.PI / 2))
  //       .round()
  //       .clone()
  //       .applyMatrix4(createRotationalMAtrix("y", Math.PI / 2))
  //       .round()
  //   );
  // }, []);
  const isPressed = useIsHotkeyPressed();
  const handleClick = (ev: any) => {
    ev.stopPropagation();

    const finded = findCubieBy(ev.eventObject.userData.id, configState);
    const faces = selectFacesFor(finded, configState);
    const rotationValue = Math.PI / 2;
    const direction = !isPressed("shift");

    const [axis = "z"] = Object.entries({
      x: isPressed("a"),
      y: isPressed("s"),
      z: isPressed("d"),
    })
      .filter(([, isPressed]) => isPressed)
      .map(([key]) => key) as ("x" | "y" | "z")[];

    console.log(
      finded.cube.userData.id,
      finded.position
      // { finded, faces, axis },

      // faces[axis].map(({ position }) => position)
    );
    isPressed("space") &&
      setRotate(
        (cubieConfig) => faces.cache[axis].has(cubieConfig.cube.userData.id),
        (currentValues) => {
          // const a = new Euler(
          //   currentValues.x,
          //   currentValues.y,
          //   currentValues.z,
          //   "XYZ"
          // );

          const newValues = { ...currentValues };
          direction
            ? (newValues[axis] += rotationValue)
            : (newValues[axis] -= rotationValue);

          // const position = new Vector3(
          //   newValues.posx,
          //   newValues.posy,
          //   newValues.posz
          // )
          //   .applyEuler(new Euler(newValues.x, newValues.y, newValues.z, "XYZ"))
          //   .round();
          // newValues.posx = position.x;
          // newValues.posy = position.y;
          // newValues.posz = position.z;
          return newValues;
        }
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
