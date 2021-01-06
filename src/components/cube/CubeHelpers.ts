import { ICubieConfig, TConfig } from "./CubeTypes";

export const findCubieBy = (id: string, config: TConfig): ICubieConfig =>
  config.find(({ cube: { userData } }) => userData.id === id) as ICubieConfig;
