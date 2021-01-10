import produce, { Draft } from "immer";
import { Euler, Matrix4, Vector3 } from "three";
import create, { State, StateCreator } from "zustand";
import { getConfig } from "../components/cube/CubeConstants";
import { GLTFResult, ICubieConfig } from "../components/cube/CubeTypes";

interface IAnimatedParams {
  [key: string]: {
    position: [number, number, number];
    rotation: [number, number, number];
    initialPosition: [number, number, number];
    scaledPosition: [number, number, number];
  };
}

const selectFacesFor = (cubieId: string, animatedParams: IAnimatedParams) => {
  const findFaceByAxis = (XorYorZ: number, axis: number) =>
    Object.entries(animatedParams)
      .filter(([, { position }]) => position[axis] === XorYorZ)
      .map(([id]) => id);

  return new Array(3)
    .fill(null)
    .map(
      (_, axis) =>
        new Set(findFaceByAxis(animatedParams[cubieId].position[axis], axis))
    );
};

const createRotationalMatrix = (axis: number, angle: number): Matrix4 => {
  let pivot: Vector3;
  if (axis === 0) {
    pivot = new Vector3(1, 0, 0);
    const rotationalMatrix = new Matrix4().makeRotationAxis(pivot, angle);
    return rotationalMatrix;
  }
  if (axis === 1) {
    pivot = new Vector3(0, 1, 0);
    const rotationalMatrix = new Matrix4().makeRotationAxis(pivot, angle);
    return rotationalMatrix;
  }
  if (axis === 2) {
    pivot = new Vector3(0, 0, 1);
    const rotationalMatrix = new Matrix4().makeRotationAxis(pivot, angle);
    return rotationalMatrix;
  }
  console.warn("!");
  return new Matrix4();
};

const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

type TStore = {
  config: { [key: string]: ICubieConfig };
  setFromResultConfig: (result: GLTFResult) => void;
  animatedParams: IAnimatedParams;
  rotateByCubie: (
    cubieId: string,
    axis: number,
    direction: boolean,
    rotationValue: number
  ) => void;
};
export const useStore = create<TStore>(
  immer((set) => ({
    config: {},
    animatedParams: {},

    setFromResultConfig: (result: GLTFResult) => {
      const config = getConfig(result);
      const configInversed = config.reduce((acc, curr, i) => {
        acc[curr.cube.userData.id] = curr;
        return acc;
      }, {} as { [key: string]: ICubieConfig });
      return set(() => ({
        config: configInversed,
        animatedParams: Object.entries(configInversed)
          .map(([cubieId, { position }]) => ({
            initialPosition: position.toArray() as [number, number, number],
            position: position.toArray() as [number, number, number],
            rotation: [0, 0, 0] as [number, number, number],
            scaledPosition: position.toArray().map((v) => v * 200) as [
              number,
              number,
              number
            ],
            cubieId,
          }))
          .reduce((acc, { cubieId, ...rest }, i) => {
            acc[cubieId] = rest;
            return acc;
          }, {} as IAnimatedParams),
      }));
    },

    rotateByCubie: (
      cubieId: string,
      axis: number,
      direction: boolean,
      rotationValue: number
    ) =>
      set((state) => {
        const faces = selectFacesFor(cubieId, state.animatedParams);
        faces[axis].forEach((cubieId) => {
          const positionnew = new Vector3()
            .fromArray(state.animatedParams[cubieId].position)
            .clone()
            .applyMatrix4(
              createRotationalMatrix(
                axis,
                direction ? rotationValue : -rotationValue
              )
            )
            .round()
            .toArray() as [number, number, number];
          state.animatedParams[cubieId].position = positionnew;
          state.animatedParams[cubieId].scaledPosition = positionnew.map(
            (v) => v * 200
          ) as [number, number, number];
          /**TODO: fix cubie rotation */
          state.animatedParams[cubieId].rotation = new Euler()
            .fromArray(state.animatedParams[cubieId].rotation)
            .setFromRotationMatrix(
              createRotationalMatrix(
                axis,
                direction ? rotationValue : -rotationValue
              )
            )
            .toArray() as [number, number, number];
        });
      }),
  }))
);
