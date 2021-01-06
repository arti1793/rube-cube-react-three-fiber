import { useSprings } from "react-spring";
import { ICubieConfig, TConfig } from "../components/cube/CubeTypes";
import { Euler, Matrix4, Vector3 } from "three";
import { useCallback } from "react";

interface IAnimatedValues {
  x: number;
  y: number;
  z: number;
}

type TSetRotate = (
  predicate: (cubieConfig: ICubieConfig) => boolean,
  setValue: (values: IAnimatedValues) => IAnimatedValues
) => void;

const createRotationalMAtrix = (
  axis: "x" | "y" | "z",
  angle: number
): Matrix4 => {
  let pivot: Vector3;
  if (axis === "x") {
    pivot = new Vector3(1, 0, 0);
    const rotationalMatrix = new Matrix4().makeRotationAxis(pivot, angle);
    return rotationalMatrix;
  }
  if (axis === "y") {
    pivot = new Vector3(0, 1, 0);
    const rotationalMatrix = new Matrix4().makeRotationAxis(pivot, angle);
    return rotationalMatrix;
  }
  if (axis === "z") {
    pivot = new Vector3(0, 0, 1);
    const rotationalMatrix = new Matrix4().makeRotationAxis(pivot, angle);
    return rotationalMatrix;
  }
  console.warn("!");
  return new Matrix4();
};

export const useCubeRotation = (config: TConfig): [TConfig, TSetRotate] => {
  const [springs, set] = useSprings(config.length, (index) => ({
    x: config[index].rotation.x,
    y: config[index].rotation.y,
    z: config[index].rotation.z,
  }));

  const setRotate: TSetRotate = useCallback(
    (predicate, setValue) => {
      set(((index: number, { values, merged, ...rest }: any) => {
        return predicate(config[index]) ? setValue(merged) : merged;
      }) as any);
    },
    [config, set]
  );
  return [
    springs.map(({ x, y, z }, i) => {
      const springRotation = new Vector3(
        x.getValue(),
        y.getValue(),
        z.getValue()
      );
      return {
        ...config[i],
        rotation: springRotation,
        position: config[i].position
          .clone()
          .applyEuler(
            new Euler(
              springRotation.x,
              springRotation.y,
              springRotation.z,
              "XYZ"
            )
          )
          .round(),
      };
    }),
    setRotate,
  ];
};
