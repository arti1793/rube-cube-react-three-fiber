import {
  BufferGeometry,
  Geometry,
  Mesh,
  MeshStandardMaterial,
  Vector3,
  Vector3Tuple,
} from "three";
import { GLTF } from "three/examples/jsm/loaders/GLTFLoader";

export interface ICubiePart {
  userData: { id: string };
  type: "cube";
  material: MeshStandardMaterial;
  geometry: Geometry | BufferGeometry;
  rotation: Vector3Tuple;
  nodeMeta: Mesh;
}

export interface ILabelPart {
  type: "label";
  material: MeshStandardMaterial;
  geometry: Geometry | BufferGeometry;
  rotation: Vector3Tuple;
  nodeMeta: Mesh;
}

export interface ICubieConfig {
  cube: ICubiePart;
  labelList: Array<ILabelPart>;
  rotation: Vector3Tuple;
  position: Vector3;
}

export type TConfig = Array<ICubieConfig>;

export type GLTFResult = GLTF & {
  nodes: CubeMeshNodes;
  materials: CubeMeshMaterials;
};

type ActionName = "Scene";

export type GLTFActions = Record<ActionName, THREE.AnimationAction>;

type CubeMeshMaterials = {
  Cube: THREE.MeshStandardMaterial;
  Yellow: THREE.MeshStandardMaterial;
  White: THREE.MeshStandardMaterial;
  Blue: THREE.MeshStandardMaterial;
  Orange: THREE.MeshStandardMaterial;
  Green: THREE.MeshStandardMaterial;
  material: THREE.MeshStandardMaterial;
};
type CubeMeshNodes = {
  Cube001_Cube_0: THREE.Mesh;
  Cube000_Cube_0: THREE.Mesh;
  Cube086_Yellow_0: THREE.Mesh;
  Cube085_Yellow_0: THREE.Mesh;
  Cube084_Yellow_0: THREE.Mesh;
  Cube083_Yellow_0: THREE.Mesh;
  Cube082_Yellow_0: THREE.Mesh;
  Cube081_Yellow_0: THREE.Mesh;
  Cube080_Yellow_0: THREE.Mesh;
  Cube079_Yellow_0: THREE.Mesh;
  Cube078_Yellow_0: THREE.Mesh;
  Cube077_White_0: THREE.Mesh;
  Cube076_White_0: THREE.Mesh;
  Cube075_White_0: THREE.Mesh;
  Cube074_White_0: THREE.Mesh;
  Cube073_White_0: THREE.Mesh;
  Cube072_White_0: THREE.Mesh;
  Cube071_White_0: THREE.Mesh;
  Cube070_White_0: THREE.Mesh;
  Cube069_White_0: THREE.Mesh;
  Cube068_Blue_0: THREE.Mesh;
  Cube067_Blue_0: THREE.Mesh;
  Cube066_Blue_0: THREE.Mesh;
  Cube065_Blue_0: THREE.Mesh;
  Cube064_Blue_0: THREE.Mesh;
  Cube063_Blue_0: THREE.Mesh;
  Cube062_Blue_0: THREE.Mesh;
  Cube061_Blue_0: THREE.Mesh;
  Cube059_Blue_0: THREE.Mesh;
  Cube058_Orange_0: THREE.Mesh;
  Cube057_Orange_0: THREE.Mesh;
  Cube056_Orange_0: THREE.Mesh;
  Cube055_Orange_0: THREE.Mesh;
  Cube054_Orange_0: THREE.Mesh;
  Cube053_Orange_0: THREE.Mesh;
  Cube052_Orange_0: THREE.Mesh;
  Cube051_Orange_0: THREE.Mesh;
  Cube050_Orange_0: THREE.Mesh;
  Cube049_Green_0: THREE.Mesh;
  Cube048_Green_0: THREE.Mesh;
  Cube047_Green_0: THREE.Mesh;
  Cube046_Green_0: THREE.Mesh;
  Cube045_Green_0: THREE.Mesh;
  Cube044_Green_0: THREE.Mesh;
  Cube043_Green_0: THREE.Mesh;
  Cube042_Green_0: THREE.Mesh;
  Cube039_Green_0: THREE.Mesh;
  Cube034_Red_0: THREE.Mesh;
  Cube040_Red_0: THREE.Mesh;
  Cube036_Red_0: THREE.Mesh;
  Cube041_Red_0: THREE.Mesh;
  Cube038_Red_0: THREE.Mesh;
  Cube033_Red_0: THREE.Mesh;
  Cube037_Red_0: THREE.Mesh;
  Cube035_Red_0: THREE.Mesh;
  Cube060_Red_0: THREE.Mesh;
  Cube032_Cube_0: THREE.Mesh;
  Cube031_Cube_0: THREE.Mesh;
  Cube030_Cube_0: THREE.Mesh;
  Cube029_Cube_0: THREE.Mesh;
  Cube027_Cube_0: THREE.Mesh;
  Cube026_Cube_0: THREE.Mesh;
  Cube025_Cube_0: THREE.Mesh;
  Cube024_Cube_0: THREE.Mesh;
  Cube023_Cube_0: THREE.Mesh;
  Cube022_Cube_0: THREE.Mesh;
  Cube021_Cube_0: THREE.Mesh;
  Cube020_Cube_0: THREE.Mesh;
  Cube019_Cube_0: THREE.Mesh;
  Cube018_Cube_0: THREE.Mesh;
  Cube017_Cube_0: THREE.Mesh;
  Cube016_Cube_0: THREE.Mesh;
  Cube015_Cube_0: THREE.Mesh;
  Cube014_Cube_0: THREE.Mesh;
  Cube012_Cube_0: THREE.Mesh;
  Cube011_Cube_0: THREE.Mesh;
  Cube010_Cube_0: THREE.Mesh;
  Cube009_Cube_0: THREE.Mesh;
  Cube008_Cube_0: THREE.Mesh;
  Cube007_Cube_0: THREE.Mesh;
};
