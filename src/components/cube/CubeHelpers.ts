import { TConfig } from "./CubeTypes";

export const findCubieBy = (id: string, config: TConfig) =>
  config.find(({ cube: { userData } }) => userData.id === id);
