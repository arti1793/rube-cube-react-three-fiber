import produce, { Draft } from "immer";
import create, { State, StateCreator } from "zustand";
import { getConfig } from "../components/cube/CubeConstants";
import { GLTFResult, ICubieConfig } from "../components/cube/CubeTypes";

export interface IHotParams {
  [key: string]: {
    position: [number, number, number];
    // rotation: [number, number, number];
    initialPosition: [number, number, number];
    scaledPosition: [number, number, number];
  };
}

// const createRotationalMatrix = (axis: number, angle: number): Matrix4 => {
//   let pivot: Vector3;
//   if (axis === 0) {
//     pivot = new Vector3(1, 0, 0);
//     const rotationalMatrix = new Matrix4().makeRotationAxis(pivot, angle);
//     return rotationalMatrix;
//   }
//   if (axis === 1) {
//     pivot = new Vector3(0, 1, 0);
//     const rotationalMatrix = new Matrix4().makeRotationAxis(pivot, angle);
//     return rotationalMatrix;
//   }
//   if (axis === 2) {
//     pivot = new Vector3(0, 0, 1);
//     const rotationalMatrix = new Matrix4().makeRotationAxis(pivot, angle);
//     return rotationalMatrix;
//   }
//   console.warn("!");
//   return new Matrix4();
// };

const immer = <T extends State>(
  config: StateCreator<T, (fn: (draft: Draft<T>) => void) => void>
): StateCreator<T> => (set, get, api) =>
  config((fn) => set(produce(fn) as (state: T) => T), get, api);

type TStore = {
  config: { [key: string]: ICubieConfig };
  setFromResultConfig: (result: GLTFResult) => void;
  // hotParams: IHotParams;
};
export const useStore = create<TStore>(
  immer((set) => ({
    config: {},

    setFromResultConfig: (result: GLTFResult) => {
      const config = getConfig(result);
      const configInversed = config.reduce((acc, curr, i) => {
        acc[curr.cube.userData.id] = curr;
        return acc;
      }, {} as { [key: string]: ICubieConfig });
      return set(() => ({
        config: configInversed,
      }));
    },
  }))
);
